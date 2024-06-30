import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { connectToDB } from "@/lib/mongoDB";
import Dish from "@/lib/models/Dish";
import Menu from "@/lib/models/Menu";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { title, description, media, category, menus, tags, sizes, price } = await req.json();
    if (!title || !description || !media || !category || !price) {
      return new NextResponse("Not enough data to create a dish", { status: 400 });
    }

    const newDish = await Dish.create({
      title,
      description,
      media,
      category,
      menus,
      tags,
      sizes,
      price,
    });

    await newDish.save();

    if (menus) {
      for (const menuId of menus) {
        const menu = await Menu.findById(menuId);
        if (menu) {
          menu.dishes.push(newDish._id);
          await menu.save();
        }
      }
    }

    return NextResponse.json(newDish, { status: 200 });
  } catch (error) {
    console.error("[dishes_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const limitParam = url.searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    let query = Dish.find().sort({ createdAt: "desc" }).populate({ path: "menus", model: Menu }).lean();

    if (limit) {
      query = query.limit(limit);
    }

    const dishes = await query.exec();

    return NextResponse.json(dishes, { status: 200 });
  } catch (error) {
    console.error("[dishes_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";