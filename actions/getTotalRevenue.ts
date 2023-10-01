import prisma from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prisma?.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders?.reduce((acc, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + parseFloat(item.product.price);
    }, 0);
    return acc + orderTotal;
  }, 0);

  return totalRevenue;
};
