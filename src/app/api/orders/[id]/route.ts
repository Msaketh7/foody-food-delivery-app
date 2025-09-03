import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/ordersModels";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  const { status } = await req.json();

  const order = await Order.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  );

  if (!order) {
    return NextResponse.json(
      { success: false, message: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, order });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  const order = await Order.findByIdAndDelete(params.id);

  if (!order) {
    return NextResponse.json(
      { success: false, message: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, message: "Order deleted" });
}
