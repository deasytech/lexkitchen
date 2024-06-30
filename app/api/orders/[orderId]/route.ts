import { NextRequest, NextResponse } from "next/server";
import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Dish from "@/lib/models/Dish";
import { connectToDB } from "@/lib/mongoDB";

export const GET = async (req: NextRequest, { params }: { params: { orderId: String }}) => {
  try {
    await connectToDB()

    const orderDetails = await Order.findById(params.orderId).populate({
      path: "dishes.dish",
      model: Dish
    })
    if (!orderDetails) {
      return new NextResponse(JSON.stringify({ message: "Order Not Found" }), { status: 404 })
    }

    const customer = await Customer.findOne({ clerkId: orderDetails.customerClerkId})

    return NextResponse.json({ orderDetails, customer }, { status: 200 })
  } catch (err) {
    console.log("[orderId_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";