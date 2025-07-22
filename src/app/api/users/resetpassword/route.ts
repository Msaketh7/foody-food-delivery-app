import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
  await connect();
  const { token, password } = await request.json();

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiry = undefined;
  await user.save();

  return NextResponse.json({ message: "Password reset successfully" });
}  catch (error: any) {
    console.error("Error in reset-password route:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}