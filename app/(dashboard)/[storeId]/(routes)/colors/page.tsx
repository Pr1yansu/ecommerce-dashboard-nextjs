import React from "react";
import ColorsClient from "./components/Client";
import prisma from "@/lib/prismadb";

import { format } from "date-fns";
import { ColorsColumn } from "./[colorId]/components/columns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prisma.colors.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedSizes: ColorsColumn[] = colors.map((item) => {
    return {
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <section className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedSizes} />
      </div>
    </section>
  );
};

export default SizesPage;
