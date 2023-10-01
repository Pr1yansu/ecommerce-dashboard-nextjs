import prisma from "@/lib/prismadb";

export const getTotalSales = async (storeId: string) => {
  const salesCount = await prisma?.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return salesCount;
};
