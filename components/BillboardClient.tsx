"use client";
import React from "react";
import Heading from "./ui/Heading";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import {
  BillboardColumn,
  columns,
} from "@/app/(dashboard)/[storeId]/(routes)/billboard/[billboardId]/components/columns";
import { DataTable } from "./ui/data-table";
import ApiList from "./ui/ApiList";

interface Props {
  data: BillboardColumn[];
}

const BillboardClient: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-baseline justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="The billboard is the first thing your customers will see when they visit your store. Make sure it's a good one!"
        />
        <Button
          className="w-[150px]"
          onClick={() => {
            router.push(`/${params.storeId}/billboard/new`);
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="my-2" />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Separator className="my-2" />
      <Heading title="Api" description="Api Calls for Billboards" />
      <ApiList entityIdName="billboardId" entityName="billboards" />
    </>
  );
};

export default BillboardClient;
