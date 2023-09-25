import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";
import prisma from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const stores = await prisma?.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <header className="border-b">
      <nav className="flex py-4 px-8 items-center">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
