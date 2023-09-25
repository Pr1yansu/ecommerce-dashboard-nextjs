import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "@/lib/prismadb";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <main className="max-w-[1440px] mx-auto px-8 py-8">{children}</main>;
};

export default layout;
