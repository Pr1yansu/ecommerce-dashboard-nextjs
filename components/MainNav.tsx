"use client";
import { usePathname, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const MainNav = ({
  className,
  setShow,
  ...props
}: {
  className: React.HtmlHTMLAttributes<HTMLElement> | string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      active: pathName === `/${params.storeId}`,
    },

    {
      href: `/${params.storeId}/billboard`,
      label: "Billboard",
      active: pathName === `/${params.storeId}/billboard`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathName === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathName === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathName === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathName === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathName === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathName === `/${params.storeId}/settings`,
    },
  ];
  return (
    <ul
      className={cn(
        "flex items-center max-lg:gap-4 max-lg:justify-center  lg:space-x-6",
        className
      )}
    >
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "max-lg:text-lg text-sm font-medium text-gray-900 hover:text-gray-700 duration-200 transition-colors",
            route.active ? "text-gray-900 font-semibold" : "text-gray-500"
          )}
          onClick={() => {
            if (setShow) {
              setShow(false);
            }
          }}
        >
          {route.label}
        </Link>
      ))}
    </ul>
  );
};

export default MainNav;
