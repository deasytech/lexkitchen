import Dish from "@/lib/models/Dish";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { dishId: string } }) => {
  try {
    await connectToDB();

    const dish = await Dish.findById(params.dishId);

    if (!dish) {
      return new NextResponse(JSON.stringify({ message: "Dish not found" }), { status: 404 });
    }

    const relatedDishes = await Dish.find({
      $and: [
        { category: dish.category },
        { menus: { $in: dish.menus } },
        { _id: { $ne: dish._id } } // Exclude the current dish
      ]
    });

    if (!relatedDishes || relatedDishes.length === 0) {
      return new NextResponse(JSON.stringify({ message: "No similar dishes found" }), { status: 404 });
    }

    return NextResponse.json(relatedDishes, { status: 200 });
  } catch (err) {
    console.log("[related_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
