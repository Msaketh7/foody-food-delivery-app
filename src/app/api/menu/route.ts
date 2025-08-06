
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import MenuItem from "@/models/menuItemsModels";
import { getDataFromToken } from "@/helpers/getDataFromToken";



export async function POST(req: NextRequest) {
  try {
    await connect();

    const userId = await getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, price, image, category, restaurantId } = body;

    if (!name || !price || !restaurantId) {
      return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
    }

    const newItem = new MenuItem({
      name,
      description,
      price,
      image,
      category,
      restaurantId,
    });

    await newItem.save();

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();

    const items = await MenuItem.find();

    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
