import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";
import Navbar from "@/components/Navbar";

export default async function dashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto lg:px-8 lg:py-8 md:py-6 md:px-4">
        {children}
      </main>
    </>
  );
}
