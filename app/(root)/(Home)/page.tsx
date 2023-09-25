"use client";
import { useStoreModal } from "@/Hooks/use-store-model";
import React, { useEffect } from "react";

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <section></section>;
};

export default SetupPage;
