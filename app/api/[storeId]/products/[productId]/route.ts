import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      productId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
      description,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    const { storeId } = params;
    const { productId } = params;

    if (!storeId) {
      return new NextResponse("Store Id not Found", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("Product Id not Found", { status: 400 });
    }

    const checkStore = await prisma?.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!checkStore) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    await prisma?.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
        description,
        storeId: params.storeId,
      },
    });

    const products = await prisma?.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { storeId } = params;
    const { productId } = params;

    if (!storeId) {
      return new NextResponse("Store Id Found", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("Product Id not Found", { status: 400 });
    }

    const checkStore = await prisma?.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!checkStore) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const product = await prisma?.product.deleteMany({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return new NextResponse("Billboard Not exists", { status: 400 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;

    if (!productId) {
      return new NextResponse("Product Id not Found", { status: 400 });
    }

    const product = await prisma?.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
        store: true,
      },
    });

    if (!product) {
      return new NextResponse("Product Not exists", { status: 400 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
