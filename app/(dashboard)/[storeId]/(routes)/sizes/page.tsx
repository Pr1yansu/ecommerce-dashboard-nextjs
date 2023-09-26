import React from "react";
import SizesClient from "./components/Client";
import prisma from "@/lib/prismadb";

import { format } from "date-fns";
import { SizesColumn } from "./[sizeId]/components/columns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prisma.size.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedSizes: SizesColumn[] = sizes.map((item) => {
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
        <SizesClient data={formattedSizes} />
      </div>
    </section>
  );
};

export default SizesPage;
