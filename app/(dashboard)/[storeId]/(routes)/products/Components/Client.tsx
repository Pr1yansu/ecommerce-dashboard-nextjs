"use client";
import React from "react";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/ApiList";
import { ProductColumn, columns } from "../[productId]/components/columns";

interface Props {
  data: ProductColumn[];
}

const ProductClient: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-baseline justify-between flex-wrap gap-4">
        <Heading
          title={`Products (${data.length})`}
          description="
            Manage your products here. You can add, edit, delete and archive products.
          "
        />
        <Button
          className="w-[150px]"
          onClick={() => {
            router.push(`/${params.storeId}/products/new`);
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="my-2" />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Separator className="my-2" />
      <Heading title="Api" description="Api Calls for Products" />
      <ApiList entityIdName="productId" entityName="products" />
    </>
  );
};

export default ProductClient;
