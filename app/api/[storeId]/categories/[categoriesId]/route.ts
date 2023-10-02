import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      categoriesId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    const { storeId } = params;
    const { categoriesId } = params;

    if (!storeId) {
      return new NextResponse("Store Id not Found", { status: 400 });
    }

    if (!categoriesId) {
      return new NextResponse("Category Id not Found", { status: 400 });
    }

    const checkStore = await prisma?.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!checkStore) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const category = await prisma?.category.updateMany({
      where: {
        id: categoriesId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(categoriesId);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoriesId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { storeId } = params;
    const { categoriesId } = params;

    if (!storeId) {
      return new NextResponse("Store Id Found", { status: 400 });
    }

    if (!categoriesId) {
      return new NextResponse("Category Id not Found", { status: 400 });
    }

    const checkStore = await prisma?.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!checkStore) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const category = await prisma?.category.deleteMany({
      where: {
        id: categoriesId,
      },
    });

    if (!categoriesId) {
      return new NextResponse("Billboard Not exists", { status: 400 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { categoriesId: string } }
) {
  try {
    const { categoriesId } = params;

    if (!categoriesId) {
      return new NextResponse("Category Id not Found", { status: 400 });
    }

    const category = await prisma?.category.findUnique({
      where: {
        id: categoriesId,
      },
      include: {
        billboard: true,
      },
    });

    if (!category) {
      return new NextResponse("Category Not exists", { status: 400 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
