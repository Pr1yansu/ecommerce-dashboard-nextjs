import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      colorId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    const { storeId } = params;
    const { colorId } = params;

    if (!storeId) {
      return new NextResponse("Store Id not Found", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color Id not Found", { status: 400 });
    }

    const checkStore = await prisma?.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!checkStore) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const color = await prisma?.colors.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { storeId } = params;
    const { colorId } = params;

    if (!storeId) {
      return new NextResponse("Store Id Found", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color Id not Found", { status: 400 });
    }

    const checkStore = await prisma?.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!checkStore) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const color = await prisma?.colors.deleteMany({
      where: {
        id: colorId,
      },
    });

    if (!color) {
      return new NextResponse("Size Not exists", { status: 400 });
    }

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const { colorId } = params;

    if (!colorId) {
      return new NextResponse("Size Id not Found", { status: 400 });
    }

    const color = await prisma?.colors.findUnique({
      where: {
        id: colorId,
      },
    });

    if (!color) {
      return new NextResponse("Size Not exists", { status: 400 });
    }

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
