"use client";
import { Product, Images, Category, Size, Colors } from "@prisma/client";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modals";
import ImageUpload from "@/components/ui/imageUpload";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  initialData:
    Product & {
        images: Images[];
      }
    | null;
  categories: Category[];
  sizes: Size[];
  colors: Colors[];
}

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  images: z
    .object({
      url: z.string(),
    })
    .array()
    .nonempty("Image is required"),
  price: z.string(),
  description: z.string().nonempty("Description is required"),
  categoryId: z.string().nonempty("Category is required"),
  sizeId: z.string().nonempty("Size is required"),
  colorId: z.string().nonempty("Color is required"),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ProductForm: React.FC<Props> = ({
  initialData,
  categories,
  sizes,
  colors,
}) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Product" : "Add Product";
  const description = initialData ? "Edit a Product" : "Add a new Product";
  const toastMessage = initialData
    ? "Product Updated Successfully"
    : "Product Added Successfully";
  const action = initialData ? "Save" : "Add";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      images: [],
      description: "",
      price: "0",
      categoryId: "",
      sizeId: "",
      colorId: "",
      isFeatured: false,
      isArchived: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      console.log("clicked");
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, values);
      }
      router.refresh();
      router.push(`/${params.storeId}/products`);
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
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("Product Deleted Successfully");
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
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((image) => image.url !== url),
                      ])
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Product Name :"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="9.99"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category ID</FormLabel>
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
                            placeholder="Select Category ID ..."
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories
                          ? categories.map((category, i) => (
                              <SelectItem key={i} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))
                          : "No Categories Available"}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size ID</FormLabel>
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
                            placeholder="Select Size ..."
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes
                          ? sizes.map((size, i) => (
                              <SelectItem key={i} value={size.id}>
                                {size.name}
                              </SelectItem>
                            ))
                          : "No Sizes Available"}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color ID</FormLabel>
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
                            placeholder="Select Color ..."
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors
                          ? colors.map((color, i) => (
                              <SelectItem key={i} value={color.id}>
                                <div
                                  className="flex items-center justify-between w-full"
                                  style={{ color: color.value }}
                                >
                                  <div
                                    className="w-4 me-1 h-4 rounded-full border"
                                    style={{
                                      backgroundColor: color.value,
                                    }}
                                  />
                                  {color.name}
                                </div>
                              </SelectItem>
                            ))
                          : "No Colors Available"}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-4 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This Product Will appear on Home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-4 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      //ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This Product Will not appear on any page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Description :"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          <div className="w-full flex justify-end">
            <Button type="submit" disabled={loading} variant={"default"}>
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
