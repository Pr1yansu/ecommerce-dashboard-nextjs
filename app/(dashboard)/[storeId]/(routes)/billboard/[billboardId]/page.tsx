import React from "react";
import BillBoardForm from "./components/BillboardForm";
import prisma from "@/lib/prismadb";

const SingleBillboard = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  if (params.billboardId === "new") {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillBoardForm initialData={null} />
        </div>
      </div>
    );
  }
  const Billboard = await prisma.billboard.findUnique({
    where: { id: params.billboardId },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardForm initialData={Billboard} />
      </div>
    </div>
  );
};

export default SingleBillboard;
