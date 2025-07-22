import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import crypto from "crypto";

interface SendEmailProps {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailProps) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");

    // Update user with verification or reset token
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Create transporter using SendGrid SMTP
    const transport = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: process.env.SENDGRID_USER || "apikey", // should be literally 'apikey'
        pass: process.env.SENDGRID_API_KEY!,
      },
    });

    // Choose URL based on email type
    const endpoint = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
    const url = `${process.env.DOMAIN}/${endpoint}?token=${token}`;

    const mailOptions = {
      from: process.env.FROM_EMAIL || "msaketh7@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>Click <a href="${url}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>
        <p>If the above link doesn't work, copy and paste this URL into your browser:</p>
        <p>${url}</p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error(error.message);
  }
};
