import React from "react";
import prisma from "@/lib/prismadb";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BiPackage, BiRupee, BiSolidCreditCard } from "react-icons/bi";
import { formatter } from "@/lib/utils";
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import { getTotalSales } from "@/actions/getTotalSales";
import { getTotalStock } from "@/actions/getTotalStock";
import { ViewGridIcon } from "@radix-ui/react-icons";
import Overview from "@/components/Overview";
import { getGraphRevenue } from "@/actions/getGraphRevenue";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getTotalSales(params.storeId);
  const stockCount = await getTotalStock(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);

  return (
    <section className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Revenue</CardTitle>
              <BiRupee className="inline-block ml-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Sales</CardTitle>
              <BiSolidCreditCard className="inline-block ml-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Stock</CardTitle>
              <BiPackage className="inline-block ml-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            Overview <ViewGridIcon />
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DashboardPage;
