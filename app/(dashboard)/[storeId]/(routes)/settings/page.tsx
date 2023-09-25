import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "@/lib/prismadb";
import SettingForm from "@/components/SettingForm";

interface Props {
  params: { storeId: string };
}

const SettingsPage: React.FC<Props> = async ({ params }) => {
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
    <section>
      <SettingForm initialStore={store} />
    </section>
  );
};

export default SettingsPage;
