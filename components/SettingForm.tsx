"use client";
import { Store } from "@prisma/client";
import React, { useState } from "react";
import Heading from "@/components/ui/Heading";
import { Button } from "./ui/button";
import { HiTrash } from "react-icons/hi2";
import { Separator } from "./ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "./modals/alert-modals";
import { ApiAlert } from "./ui/api-alert";
import { useOrigin } from "@/Hooks/use-origin";

interface Props {
  initialStore: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

const SettingForm: React.FC<Props> = ({ initialStore }) => {
  const origin = useOrigin();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialStore,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/stores/${params.storeId}`, values);
      router.refresh();
      toast.success("Store Updated Successfully");
    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response.data === "Store already exists"
          ? "Store Already Exists"
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteStore = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      setOpen(false);
      toast.success("Store Deleted Successfully");
      router.refresh();
      router.push("/");
    } catch (error: any) {
      toast.error(
        "Please remove all the products first and categories then try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteStore}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage Store Settings Here" />
        <Button
          variant={"destructive"}
          size={"icon"}
          onClick={() => setOpen(true)}
          className="rounded-full"
        >
          <HiTrash className="w-4 h-4" />
        </Button>
      </div>
      <Separator className="my-2" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 py-2 pb-4 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Change store name :</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Store Name :"
                      disabled={loading}
                    />
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
              Save
            </Button>
          </div>
        </form>
      </Form>
      <Separator className="my-2" />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="admin"
      />
    </>
  );
};

export default SettingForm;
