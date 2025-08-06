// app/api/restaurants/route.ts
import { NextResponse, NextRequest} from "next/server";
import { connect } from "@/dbConfig/dbConfig"; // your DB connection util
import  Restaurant  from "@/models/restaurantModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET() {
  try {
    await connect();
    const restaurants = await Restaurant.find();
    return NextResponse.json({ success: true, data: restaurants });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch restaurants." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();

    const { name, description, image, address } = body;

    if (!name || !image) {
      return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
    }

    const newRestaurant = new Restaurant({ name, description, image, address });
    await newRestaurant.save();

    return NextResponse.json({ success: true, data: newRestaurant });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to add restaurant." }, { status: 500 });
  }
}
