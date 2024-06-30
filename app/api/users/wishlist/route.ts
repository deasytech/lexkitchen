import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const user = await User.findOne({clerkId: userId});
    if (!user) {
      return new NextResponse("User not found!", { status: 404 });
    }

    const { dishId } = await req.json();
    if (!dishId) {
      return new NextResponse("Dish id is required.", { status: 400 });
    }

    const isLiked = user.wishList.includes(dishId);
    if (isLiked) {
      user.wishList = user.wishList.filter((id: string) => id !== dishId);
    } else {
      user.wishList.push(dishId);
    }

    await user.save();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("[users_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}