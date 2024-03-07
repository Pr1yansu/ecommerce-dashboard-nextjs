import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import prisma from "@/lib/prismadb";
import NavigationSection from "./Navigation-section";

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
        <NavigationSection stores={stores} />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
