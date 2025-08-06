// app/api/restaurants/[id]/menu/route.ts
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig"; // your DB connection util
import MenuItem from "@/models/menuItemsModels";

interface Params {
  params: { id: string };
}

export async function GET(request:NextRequest, { params }: Params) {
  try {
    await connect();
    const items = await MenuItem.find({ restaurantId: params.id });

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch menu items." }, { status: 500 });
  }
}
