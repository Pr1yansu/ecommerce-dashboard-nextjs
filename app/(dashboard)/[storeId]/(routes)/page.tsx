import React from "react";
import prisma from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <section>
      <div>
        <h6>Active Store : {store?.name}</h6>
      </div>
    </section>
  );
};

export default DashboardPage;
