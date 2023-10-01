import React from "react";
import ColorsForm from "./components/ColorsForm";
import prisma from "@/lib/prismadb";

const SizePage = async ({ params }: { params: { colorId: string } }) => {
  if (params.colorId === "new") {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ColorsForm initialData={null} />
        </div>
      </div>
    );
  }
  const Colors = await prisma.colors.findUnique({
    where: { id: params.colorId },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsForm initialData={Colors} />
      </div>
    </div>
  );
};

export default SizePage;
