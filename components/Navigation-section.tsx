"use client";
import React from "react";
import StoreSwitcher from "./StoreSwitcher";
import MainNav from "./MainNav";
import { Store } from "@prisma/client";
import { Button } from "./ui/button";
import { ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const NavigationSection = ({ stores }: { stores: Store[] }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [show, setShow] = React.useState<boolean>(false);

  const toggleShow = () => {
    setShow(!show);
  };

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreSwitcher items={stores} />
      <MainNav className="lg:flex hidden ms-6" setShow={setShow} />
      {show && (
        <MainNav
          className="mx-6 max-lg:fixed top-0 left-0 bottom-0 right-0 bg-white z-40 flex-col lg:hidden"
          setShow={setShow}
        />
      )}
      <Button
        className={cn("ms-6 lg:hidden z-50", show && "fixed top-4 right-4")}
        onClick={toggleShow}
        aria-label={show ? "Close" : "Open"}
        size={"sm"}
        variant={"ghost"}
      >
        {show ? (
          <ExitIcon className="h-6 w-6" />
        ) : (
          <HamburgerMenuIcon className="h-6 w-6" />
        )}
      </Button>
    </>
  );
};

export default NavigationSection;
