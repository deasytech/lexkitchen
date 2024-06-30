import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { connectToDB } from "@/lib/mongoDB";
import Menu from "@/lib/models/Menu";
import Dish from "@/lib/models/Dish";

export const GET = async (
  req: NextRequest,
  { params }: { params: { menuId: string } }
) => {
  try {
    await connectToDB();

    const menu = await Menu.findById(params.menuId).populate({ path: "dishes", model: Dish });

    if (!menu) {
      return new NextResponse(
        JSON.stringify({ message: "Menu not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(menu, { status: 200 });
  } catch (err) {
    console.log("[menuId_GET]", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { menuId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let menu = await Menu.findById(params.menuId);

    if (!menu) {
      return new NextResponse("Menu not found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    menu = await Menu.findByIdAndUpdate(
      params.menuId,
      { title, description, image },
      { new: true }
    );

    await menu.save();

    return NextResponse.json(menu, { status: 200 });
  } catch (err) {
    console.log("[menuId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { menuId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Menu.findByIdAndDelete(params.menuId);

    await Dish.updateMany(
      { menus: params.menuId },
      { $pull: { menus: params.menuId } }
    );

    return new NextResponse("Menu is deleted", { status: 200 });
  } catch (err) {
    console.log("[menuId_DELETE]", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";