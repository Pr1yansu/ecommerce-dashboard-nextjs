"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface Props {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<Props> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="flex mb-4 items-center gap-4">
        {value.map((item, i) => (
          <div
            key={i}
            className="relative w-[200px] h-[200px] overflow-hidden rounded-md"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                variant={"destructive"}
                type="button"
                size={"icon"}
                className="rounded-full"
                onClick={() => {
                  onRemove(item);
                }}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover object-center"
              alt="img"
              src={item}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="m31zhi7z">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              disabled={disabled}
              onClick={onClick}
              variant={"secondary"}
              className=""
            >
              <AiOutlineCloudUpload className="h-4 w-4 mr-2" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
