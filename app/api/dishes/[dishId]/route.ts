import Menu from "@/lib/models/Menu";
import Dish from "@/lib/models/Dish";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { dishId: string } }
) => {
  try {
    await connectToDB();

    const dish = await Dish.findById(params.dishId).populate({
      path: "menus",
      model: Menu,
    }).lean();

    if (!dish) {
      return new NextResponse(
        JSON.stringify({ message: "Dish not found" }),
        { status: 404 }
      );
    }
    
    return new NextResponse(JSON.stringify(dish), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[api_dishId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { dishId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const dish = await Dish.findById(params.dishId);

    if (!dish) {
      return new NextResponse(
        JSON.stringify({ message: "Dish not found" }),
        { status: 404 }
      );
    }

    const {
      title,
      description,
      media,
      category,
      menus,
      tags,
      sizes,
      price,
    } = await req.json();

    if (!title || !description || !media || !category || !price) {
      return new NextResponse("Not enough data to create a new dish", {
        status: 400,
      });
    }

    const addedMenus = menus.filter(
      (menuId: string) => !dish.menus.includes(menuId)
    );
    // included in new data, but not included in the previous data

    const removedMenus = dish.menus.filter(
      (menuId: string) => !menus.includes(menuId)
    );
    // included in previous data, but not included in the new data

    // Update menus
    await Promise.all([
      // Update added menus with this dish
      ...addedMenus.map((menuId: string) =>
        Menu.findByIdAndUpdate(menuId, {
          $push: { dishs: dish._id },
        })
      ),

      // Update removed menus without this dish
      ...removedMenus.map((menuId: string) =>
        Menu.findByIdAndUpdate(menuId, {
          $pull: { dishs: dish._id },
        })
      ),
    ]);

    // Update dish
    const updatedDish = await Dish.findByIdAndUpdate(
      dish._id,
      {
        title,
        description,
        media,
        category,
        menus,
        tags,
        sizes,
        price,
      },
      { new: true }
    ).populate({ path: "menus", model: Menu });

    await updatedDish.save();

    return NextResponse.json(updatedDish, { status: 200 });
  } catch (err) {
    console.log("[dishId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { dishId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const dish = await Dish.findById(params.dishId);

    if (!dish) {
      return new NextResponse(
        JSON.stringify({ message: "Dish not found" }),
        { status: 404 }
      );
    }

    await Dish.findByIdAndDelete(dish._id);

    // Update menus
    await Promise.all(
      dish.menus.map((menuId: string) =>
        Menu.findByIdAndUpdate(menuId, {
          $pull: { dishs: dish._id },
        })
      )
    );

    return new NextResponse(JSON.stringify({ message: "Dish deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.log("[dishId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";