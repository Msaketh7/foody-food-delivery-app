// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@//dbConfig/dbConfig";
import crypto from "crypto";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
  await connect();
  const { email } = await request.json();
  console.log("Received email:", email);
  const user = await User.findOne({ email });
  if (!user) 
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();
  console.log("Sending reset email...");
  await sendEmail({
  email: user.email,
  emailType: "RESET",
  userId: user._id.toString(), 
});
  return NextResponse.json({ message: "Reset link sent" });
}
catch (err: any) {
    console.error("Forgot password error:", err.message);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
}
}
