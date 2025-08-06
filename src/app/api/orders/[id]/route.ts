import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/ordersModels";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connect();
  const body = await req.json();
  const { status } = body;

  const order = await Order.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  );

  return NextResponse.json({ success: true, order });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connect();
  await Order.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true, message: "Order deleted" });
}
