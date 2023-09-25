import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Store Id not Found", { status: 400 });
    }

    const checkStore = await prisma?.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!checkStore) {
      return new NextResponse("Store Not exists", { status: 400 });
    }

    const store = await prisma?.store.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Store Id Found", { status: 400 });
    }

    const store = await prisma?.store.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!store) {
      return new NextResponse("Store Not exists", { status: 400 });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
