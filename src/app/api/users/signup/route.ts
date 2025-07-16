import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    console.log("POST handler started");
    const reqBody = await request.json();
    console.log("Request body:", reqBody);
    const { username, email, password } = reqBody;
    console.log(reqBody);
    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      console.log("User exists");
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    //save new user
    const savedUser = await newUser.save();
    console.log("User saved:", savedUser);
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });

}
  catch (error: any) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}