// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModels"; 
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const userId = await getDataFromToken(req);
    const { menuItemId, quantity } = await req.json();

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item: any) => item.menuItem.toString() === menuItemId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ menuItem: menuItemId, quantity });
    }

    await cart.save();

    return NextResponse.json({ success: true, cart });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connect();
    const userId = await getDataFromToken(req);

    const cart = await Cart.findOne({ userId }).populate("items.menuItem");

    return NextResponse.json({ success: true, cart });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    await connect();
    const userId = await getDataFromToken(req);
    const { menuItemId } = await req.json();

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ success: false, message: "Cart not found." }, { status: 404 });
    }

    cart.items = cart.items.filter((item: any) => item.menuItem.toString() !== menuItemId);
    await cart.save();

    return NextResponse.json({ success: true, cart });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}