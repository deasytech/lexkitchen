import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { connectToDB } from "@/lib/mongoDB";
import Menu from "@/lib/models/Menu";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { title, description, image } = await req.json();

    const existingMenu = await Menu.findOne({ title });
    if (existingMenu) {
      return new NextResponse("Menu already exists", { status: 400 });
    }

    if (!title || !image) {
      return new NextResponse("Title and Image are required", { status: 400 });
    }

    const newMenu = await Menu.create({
      title,
      description,
      image
    });

    await newMenu.save();

    return NextResponse.json(newMenu, { status: 200 });
  } catch (error) {
    console.error("[menus_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const menus = await Menu.find().sort({ createdAt: "desc" });

    return NextResponse.json(menus, { status: 200 });
  } catch (error) {
    console.error("[menus_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}