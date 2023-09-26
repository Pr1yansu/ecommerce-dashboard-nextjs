import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      sizeId: string;
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
    const { sizeId } = params;

    if (!storeId) {
      return new NextResponse("Store Id not Found", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size Id not Found", { status: 400 });
    }

    const checkStore = await prisma?.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!checkStore) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const size = await prisma?.size.updateMany({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { storeId } = params;
    const { sizeId } = params;

    if (!storeId) {
      return new NextResponse("Store Id Found", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size Id not Found", { status: 400 });
    }

    const checkStore = await prisma?.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!checkStore) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const Size = await prisma?.size.deleteMany({
      where: {
        id: sizeId,
      },
    });

    if (!Size) {
      return new NextResponse("Size Not exists", { status: 400 });
    }

    return NextResponse.json(Size);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    const { sizeId } = params;

    if (!sizeId) {
      return new NextResponse("Size Id not Found", { status: 400 });
    }

    const size = await prisma?.size.findUnique({
      where: {
        id: sizeId,
      },
    });

    if (!size) {
      return new NextResponse("Size Not exists", { status: 400 });
    }

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
