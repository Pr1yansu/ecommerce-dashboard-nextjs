"use client";
import React from "react";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";

import { DataTable } from "@/components/ui/data-table";
import { OrderColumn, columns } from "./columns";

interface Props {
  data: OrderColumn[];
}

const OrderClient: React.FC<Props> = ({ data }) => {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage your orders here."
        />
      </div>
      <Separator className="my-2" />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

export default OrderClient;
