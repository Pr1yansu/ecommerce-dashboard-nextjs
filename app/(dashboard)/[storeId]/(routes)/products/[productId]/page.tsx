import React from "react";
import ProductForm from "./components/ProductForm";
import prisma from "@/lib/prismadb";

const SingleProduct = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const Product = await prisma.product.findUnique({
    where: { id: params.productId },
    include: {
      images: true,
    },
  });
  const categories = await prisma.category.findMany({
    where: { storeId: params.storeId },
  });
  const sizes = await prisma.size.findMany({
    where: { storeId: params.storeId },
  });
  const colors = await prisma.colors.findMany({
    where: { storeId: params.storeId },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={Product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
