"use client";

import { UserButton } from "@clerk/nextjs";
import { Product } from "@prisma/client";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Loader2, PackagePlus } from "lucide-react";
import { Transition } from "@headlessui/react";
import { useTransition } from "react";
import { handleNewProduct } from "~/server/actions/products";
import { redirect, useSearchParams } from "next/navigation";

export default function CreateProduct() {
  const [saving, startSaving] = useTransition();
  const searchParams = useSearchParams();
  const barcode = searchParams.get("barcode");

  const newProduct = useForm<Product>({
    defaultValues: {
      barcode: barcode ? barcode : undefined,
    },
  });

  function handleSubmit(data: Product) {
    startSaving(async () => {
      // Force name to uppercase
      data.name = data.name.toUpperCase();

      const fetch = await handleNewProduct(data);
      if (!fetch.barcode) throw new Error("Failed to create product");

      redirect(`/product/${fetch.barcode}`);
    });
  }

  return (
    <>
      <div className="relative bg-gray-200 p-5 pt-20">
        <div className="absolute right-5 top-5">
          <UserButton />
        </div>
        <h1>Add a new product</h1>
        <p className="text-sm text-gray-500">
          Add a missing product to the database.
        </p>
      </div>

      <Form {...newProduct}>
        <form
          className="space-y-3 p-5"
          onSubmit={newProduct.handleSubmit(handleSubmit)}
        >
          <FormField
            control={newProduct.control}
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Barcode</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="684356568..."
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the UPC or EAN code, usually found on the rear of the
                  product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={newProduct.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase"
                    placeholder="MOTORING PASTE FOR..."
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription>The full name of the product</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={newProduct.control}
            name="storeCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Code</FormLabel>
                <FormControl>
                  <Input required placeholder="dsh2894" {...field} />
                </FormControl>
                <FormDescription>
                  Optional - store code for the product
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={newProduct.control}
            name="supplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier</FormLabel>
                <FormControl>
                  <Input placeholder="BOSH" {...field} />
                </FormControl>
                <FormDescription>The OEM or supplier name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={newProduct.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <FormControl>
                  <Input placeholder="Damp proofing" {...field} />
                </FormControl>
                <FormDescription>Area of the store</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-3">
            <Button type="submit">
              <PackagePlus className="mr-1 h-5 w-5" />
              Add Product
            </Button>
            <Transition
              className="flex animate-pulse items-center transition-all duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              show={saving}
            >
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span>Saving</span>
            </Transition>
          </div>
        </form>
      </Form>
    </>
  );
}
