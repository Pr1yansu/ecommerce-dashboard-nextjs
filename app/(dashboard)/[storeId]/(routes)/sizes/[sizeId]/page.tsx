import React from "react";
import SizesForm from "./components/SizesForm";
import prisma from "@/lib/prismadb";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const Size = await prisma.size.findUnique({
    where: { id: params.sizeId },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesForm initialData={Size} />
      </div>
    </div>
  );
};

export default SizePage;
