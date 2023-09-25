"use client";
import React, { useState } from "react";
import { Popover, PopoverTrigger } from "./ui/popover";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/Hooks/use-store-model";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { AiOutlineAppstoreAdd, AiTwotoneAppstore } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { PopoverContent } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./ui/command";
import { CommandInput, CommandList } from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formatedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formatedItems.find((item) => {
    return item.value === params.storeId;
  });

  const [open, setOpen] = useState(false);

  const storeSelectHandler = (value: string) => {
    setOpen(false);
    router.push(`/${value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <AiTwotoneAppstore className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <HiChevronUpDown className="ml-auto shrink-0 opacity-50 h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store ..." />
            <CommandEmpty>No Store Found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formatedItems.map((item, i) => (
                <CommandItem
                  key={i}
                  onSelect={() => storeSelectHandler(item.value)}
                  className="text-sm cursor-pointer"
                >
                  <AiTwotoneAppstore className="mr-2 h-4 w-4" />
                  <h6 className="text-[12px]">{item.label}</h6>
                  <HiCheck
                    className={cn(
                      "ml-auto h-4 w-4",
                      item.value === currentStore?.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => storeModal.onOpen()}
                className="text-sm"
              >
                <AiOutlineAppstoreAdd className="mr-2 h-4 w-4" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
