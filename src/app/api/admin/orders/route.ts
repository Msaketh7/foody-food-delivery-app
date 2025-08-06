import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/ordersModels";
import { checkAdmin } from "@/helpers/checkAdmin";

// GET: Admin - All orders
export async function GET(req: NextRequest) {
  try {
    await connect();
    await checkAdmin(req);

    const orders = await Order.find({})
      .populate("userId", "username email")
      .populate("items.menuItem")
      .sort({ orderedAt: -1 });

    return NextResponse.json({ success: true, orders });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}
