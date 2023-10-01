import prisma from "@/lib/prismadb";

export const getTotalStock = async (storeId: string) => {
  const stockCount = await prisma?.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
};
