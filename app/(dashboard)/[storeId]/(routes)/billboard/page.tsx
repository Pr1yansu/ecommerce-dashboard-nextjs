import React from "react";
import BillboardClient from "@/components/BillboardClient";
import prisma from "@/lib/prismadb";
import { BillboardColumn } from "./[billboardId]/components/columns";
import { format } from "date-fns";

const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prisma.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((billboard) => {
    return {
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <section className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </section>
  );
};

export default BillboardPage;
