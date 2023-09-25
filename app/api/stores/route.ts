import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const checkStore = await prisma?.store.findFirst({
      where: {
        name,
      },
    });

    if (checkStore) {
      return new NextResponse("Store already exists", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const store = await prisma?.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
