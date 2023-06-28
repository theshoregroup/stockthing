"use client";

import { Product } from "@prisma/client";
import { CheckCheck, Move, QrCode, Store } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  StoreDispatchInADialog,
  useStore,
} from "~/components/context/StoreContext";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ProductsInStores } from "@prisma/client";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useTransition } from "react";
import { handleSaveProductsInStores } from "~/server/actions/products";

interface ProductWithStock extends Product {
  stock: ProductsInStores[];
}

export default function ProductForm({
  product,
}: {
  product: ProductWithStock;
}) {
  const currentStore = useStore();
  const { user, isLoaded } = useUser();
  const [isSaving, startSaving] = useTransition();

  const currentValuesIfAvailable = product.stock.find((obj) => {
    return obj.storeId == currentStore?.store?.id;
  });

  const checklistItem = useForm<ProductsInStores>({
    defaultValues: {
      productId: product.barcode,
      storeId: currentStore?.store?.id,
      byUser: user?.id,
      uplift: currentValuesIfAvailable?.uplift,
      outOfDate: currentValuesIfAvailable?.outOfDate,
    },
  });

  if (!user && isLoaded) {
    useSignIn();
  }

  function handleSubmit(data: ProductsInStores) {
    startSaving(async () => {
      // Need to force the types here because the form is returning strings
      data.uplift = parseInt(data.uplift.toString());
      data.outOfDate = parseInt(data.outOfDate.toString());
      data.byUser = user!.id;
      const updated = await handleSaveProductsInStores(data);
    });
  }

  return (
    <>
      <Form {...checklistItem}>
        <form onSubmit={checklistItem.handleSubmit(handleSubmit)}>
          {/* Barcode Viewer */}
          <div>
            <Label>Product Barcode</Label>
            <Input value={product.barcode} disabled />
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <FormField
              control={checklistItem.control}
              name="uplift"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock to Uplift</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      placeholder="Input #"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    #of stock to uplift from the warehouse
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={checklistItem.control}
              name="outOfDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Out of date Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      placeholder="Input #"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    # of out-of-date stock to remove
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-2 flex gap-2">
            <Button>
              <CheckCheck className="mr-1 h-5 w-5" />
              Save
            </Button>
            {currentValuesIfAvailable ? (
              <div className="text-xs text-gray-500">
                <span className="block">
                  Last saved:{" "}
                  {new Date(
                    currentValuesIfAvailable.updatedAt
                  ).toLocaleDateString()}{" "}
                  at{" "}
                  {new Date(
                    currentValuesIfAvailable.updatedAt
                  ).toLocaleTimeString()}
                </span>
              </div>
            ) : null}
          </div>
          <div className="my-2 rounded-xl bg-gradient-to-tr from-blue-500 via-sky-400  to-cyan-400 p-5 text-white">
            <div>
              <Store className="h-7 w-7" />
              <h4>
                You're currently adding details for {currentStore?.store?.name}
              </h4>
            </div>
            <p className="mb-2 text-sm text-gray-100">
              You can change your active store at any time.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"secondary"}>
                  <Move className="mr-1 h-5 w-5" />
                  Change Store
                </Button>
              </DialogTrigger>
              <StoreDispatchInADialog />
            </Dialog>
          </div>
        </form>
      </Form>
    </>
  );
}
