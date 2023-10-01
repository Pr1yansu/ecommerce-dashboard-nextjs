import React from "react";
import CategoryForm from "./components/CategoryForm";
import prisma from "@/lib/prismadb";

const SingleCategory = async ({
  params,
}: {
  params: { categoriesId: string; storeId: string };
}) => {
  const billboards = await prisma.billboard.findMany({
    where: { storeId: params.storeId },
  });

  if (params.categoriesId === "new") {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryForm billboards={billboards} initialData={null} />
        </div>
      </div>
    );
  }

  const Category = await prisma.category.findUnique({
    where: { id: params.categoriesId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={Category} billboards={billboards} />
      </div>
    </div>
  );
};

export default SingleCategory;
