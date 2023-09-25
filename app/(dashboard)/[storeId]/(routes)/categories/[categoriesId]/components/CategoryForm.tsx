"use client";
import { Billboard, Category } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  initialData: Category | null;
  billboards: Billboard[];
}

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

const CategoryForm: React.FC<Props> = ({ initialData, billboards }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Category" : "Add Category";
  const description = initialData ? "Edit a Category" : "Add a new Category";
  const toastMessage = initialData
    ? "Category Updated Successfully"
    : "Category Added Successfully";
  const action = initialData ? "Save" : "Add";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoriesId}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, values);
      }
      router.refresh();
      router.push(`/${params.storeId}/billboard`);
      toast.success(toastMessage);
    } catch (error: any) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoriesId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Billboard Deleted Successfully");
    } catch (error: any) {
      toast.error("Something went wrong, please try again or contact support");
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
      <div className="flex items-center justify-between">
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
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
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard ID</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select Billboard ID ..."
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {billboards.map((billboard, i) => (
                          <SelectItem key={i} value={billboard.id}>
                            {billboard.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

export default CategoryForm;
