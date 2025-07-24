import sgMail from "@sendgrid/mail";
import User from "@/models/userModel";
import crypto from "crypto";

interface SendEmailProps {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
  token?: string; // optional token
}

export const sendEmail = async ({ email, emailType, userId, token }: SendEmailProps) => {
  try {
    // Generate a token if not provided
    const secureToken = token || crypto.randomBytes(32).toString("hex");

    // Update the user with the token and expiry
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: secureToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        resetPasswordToken: secureToken,
        resetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    // Determine the correct endpoint and URL
    const endpoint = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
    const url = `${process.env.DOMAIN}/${endpoint}?token=${secureToken}`;

    // Email content
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

    // Send the email
    const response = await sgMail.send(mailOptions);
    return response;

  } catch (error: any) {
    console.error("SendGrid API Error:", error.response?.body || error.message);
    throw new Error("Email sending failed");
  }
};
