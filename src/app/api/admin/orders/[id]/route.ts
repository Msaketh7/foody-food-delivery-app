import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/ordersModels";
import { checkAdmin } from "@/helpers/checkAdmin";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connect();
    await checkAdmin(req);

    const { status } = await req.json();

    const validStatuses = ["pending", "preparing", "out-for-delivery", "delivered"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
    }

    const order = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    ).populate("userId", "username").populate("items.menuItem");

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
