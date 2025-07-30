import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function PATCH(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();

    // Case 1: Password reset via token (forgot password flow)
    if (body.token) {
      const { token, password } = body;

      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordTokenExpiry: { $gt: Date.now() },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Invalid or expired token" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpiry = undefined;
      await user.save();

      return NextResponse.json({ message: "Password reset successfully" });
    }

    // Case 2: Authenticated password update from profile page
    else {
      const userId = await getDataFromToken(request);
      const { oldPassword, newPassword } = body;

      if (!oldPassword || !newPassword) {
        return NextResponse.json(
          { error: "Old password and new password are required" },
          { status: 400 }
        );
      }

      const user = await User.findById(userId);
      

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { error: "Old password is incorrect" },
          { status: 400 }
        );
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();

      return NextResponse.json({ message: "Password updated successfully" });
    }
  } catch (error: any) {
    console.error("Error in resetpassword route:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
