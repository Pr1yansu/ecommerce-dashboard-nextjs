"use client";
import React from "react";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/ApiList";
import { CategoryColumn, columns } from "../[categoriesId]/components/columns";

interface Props {
  data: CategoryColumn[];
}

const CategoryClient: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-baseline justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Categories are used to group products together."
        />
        <Button
          className="w-[150px]"
          onClick={() => {
            router.push(`/${params.storeId}/categories/new`);
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="my-2" />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Separator className="my-2" />
      <Heading title="Api" description="Api Calls for Categories" />
      <ApiList entityIdName="cillboardId" entityName="categories" />
    </>
  );
};

export default CategoryClient;
