"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellActions } from "./cell-action";
import toast from "react-hot-toast";

export type ColorsColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div
          className="h-6 w-6 rounded-full border cursor-pointer"
          style={{ backgroundColor: row.original.value }}
          onClick={() => {
            navigator.clipboard.writeText(row.original.value);
            toast.success("Copied color to clipboard");
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
