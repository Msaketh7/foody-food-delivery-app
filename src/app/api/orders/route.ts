import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/ordersModels";
import Cart from "@/models/cartModels";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const userId = await getDataFromToken(req);
    const { deliveryAddress } = await req.json();

    const cart = await Cart.findOne({ userId }).populate("items.menuItem");

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ success: false, message: "Cart is empty" }, { status: 400 });
    }

    const totalAmount = cart.items.reduce(
      (acc, item: any) => acc + item.menuItem.price * item.quantity,
      0
    );

    const order = new Order({
      userId,
      items: cart.items,
      totalAmount,
      deliveryAddress,
    });

    await order.save();
    await Cart.deleteOne({ userId }); // Clear cart after order

    return NextResponse.json({ success: true, order });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  try {
    await connect();
    const userId = await getDataFromToken(req);

    const orders = await Order.find({ userId }).populate("items.menuItem").sort({ orderedAt: -1 });

    return NextResponse.json({ success: true, orders });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    await connect();
    const userId = await getDataFromToken(req);
    const { orderId, status } = await req.json();

    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    const validStatuses = ["pending", "Placed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status value" }, { status: 400 });
    }

    order.status = status;
    await order.save();

    return NextResponse.json({ success: true, order });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    await connect();
    const userId = await getDataFromToken(req);
    const { orderId } = await req.json();

    const order = await Order.findOneAndDelete({ _id: orderId, userId });

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Order cancelled", order });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

