"use server";

import { Product, ProductsInStores } from "@prisma/client";
import { prisma } from "../db";
import { revalidatePath } from "next/cache";

export async function handleAddProduct(input: Product) {
  const product = await prisma.product.create({ data: input });
  return product;
}

export async function handleNewProduct(input: Product) {
  const newProduct = await prisma.product.create({ data: input });
  return newProduct;
}

export async function handleSaveProductsInStores(input: ProductsInStores) {
  const product = await prisma.productsInStores.upsert({
    where: {
      storeId_productId: {
        storeId: input.storeId,
        productId: input.productId,
      },
    },
    update: {
      byUser: input.byUser,
      outOfDate: input.outOfDate,
      uplift: input.uplift,
      updatedAt: new Date(),
    },
    create: {
      byUser: input.byUser,
      outOfDate: input.outOfDate,
      uplift: input.uplift,
      storeId: input.storeId,
      productId: input.productId,
    },
  });
  revalidatePath(`/products/${input.productId}`);
  return product;
}
