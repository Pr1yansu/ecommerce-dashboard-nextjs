"use client";
import { Colors } from "@prisma/client";
import React, { useState } from "react";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { HiTrash } from "react-icons/hi2";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modals";

interface Props {
  initialData: Colors | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(3).regex(/^#/, "Must be a valid hex color"),
});

type FormValues = z.infer<typeof formSchema>;

const ColorsForm: React.FC<Props> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Color" : "Add Color";
  const description = initialData ? "Edit a Color" : "Add a new Color";
  const toastMessage = initialData
    ? "Color Updated Successfully"
    : "Color Added Successfully";
  const action = initialData ? "Save" : "Add";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, values);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (error: any) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      location.reload();
      router.push(`/${params.storeId}/colors`);
      toast.success("Color Deleted Successfully");
    } catch (error: any) {
      toast.error(
        "Something went wrong make sure you removed all the products for this color"
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={() => setOpen(true)}
            className="rounded-full"
          >
            <HiTrash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator className="my-2" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 py-2 pb-4 w-full"
        >
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Name ..."
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color value</FormLabel>
                  <FormControl>
                    <div className="flex gap-x-2 items-center">
                      <Input
                        {...field}
                        placeholder="Value ..."
                        disabled={loading}
                      />
                      <div
                        className="rounded-full p-4 border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              variant={"default"}
              className=""
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ColorsForm;
