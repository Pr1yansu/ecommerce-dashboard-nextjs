"use client";

import { AiOutlineCloudServer } from "react-icons/ai";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import { LiaCopy } from "react-icons/lia";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "public",
  admin: "admin",
};
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
    toast.success("Copied to clipboard");
  };

  return (
    <Alert>
      <AlertTitle className="flex gap-2">
        <AiOutlineCloudServer className="h-4 w-4 my-2" />
        <div className="flex items-center justify-between w-full">
          <h6>{title}</h6>
          <Badge className="ml-auto capitalize" variant={variantMap[variant]}>
            {textMap[variant]}
          </Badge>
        </div>
      </AlertTitle>
      <AlertDescription className="my-2 flex justify-between items-center flex-wrap gap-2">
        <code
          className="
            relative
            rounded-md
            bg-muted
            px-[0.3rem]
            py-[0.2rem]
            text-xs
            font-semibold
            whitespace-pre-wrap
            break-all
        "
        >
          {description}
        </code>
        <Button variant="outline" size={"icon"} onClick={copyToClipboard}>
          <LiaCopy size={20} />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
