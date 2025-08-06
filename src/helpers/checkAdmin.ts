import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export const checkAdmin = async (req: NextRequest) => {
  try {
    await connect();

    const token = req.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    const user = await User.findById(decodedToken.id);

    if (!user || !user.isAdmin) {
      throw new Error("Access denied: Admin only");
    }

    return user._id;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
