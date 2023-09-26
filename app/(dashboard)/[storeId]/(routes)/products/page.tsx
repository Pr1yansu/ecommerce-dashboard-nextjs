import React from "react";
import ProductClient from "./Components/Client";
import prisma from "@/lib/prismadb";
import { ProductColumn } from "./[productId]/components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prisma.product.findMany({
    where: { storeId: params.storeId },
    include: { category: true, size: true, color: true },
    orderBy: { createdAt: "desc" },
  });

  const formattedproducts: ProductColumn[] = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      price: formatter.format(parseFloat(product.price)),
      category: product.category.name,
      size: product.size.name,
      color: product.color.value,
      description: product.description,
      createdAt: format(product.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <section className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedproducts} />
      </div>
    </section>
  );
};

export default ProductsPage;
