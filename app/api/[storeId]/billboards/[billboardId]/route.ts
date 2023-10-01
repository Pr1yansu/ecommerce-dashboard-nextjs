import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      billboardId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    const { storeId } = params;
    const { billboardId } = params;

    if (!storeId) {
      return new NextResponse("Store Id not Found", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard Id not Found", { status: 400 });
    }

    const checkStore = await prisma?.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!checkStore) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const billboard = await prisma?.billboard.updateMany({
      where: {
        id: billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { storeId } = params;
    const { billboardId } = params;

    if (!storeId) {
      return new NextResponse("Store Id Found", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard Id not Found", { status: 400 });
    }

    const checkStore = await prisma?.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!checkStore) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const billboard = await prisma?.billboard.deleteMany({
      where: {
        id: billboardId,
      },
    });

    if (!billboard) {
      return new NextResponse("Billboard Not exists", { status: 400 });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { billboardId } = params;

    if (!billboardId) {
      return new NextResponse("Billboard Id not Found", { status: 400 });
    }

    const billboard = await prisma?.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });

    if (!billboard) {
      return new NextResponse("Billboard Not exists", { status: 400 });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
