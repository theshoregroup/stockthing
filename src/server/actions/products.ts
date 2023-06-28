"use server";

import { Product } from "@prisma/client";
import { prisma } from "../db";

export async function handleAddProduct(input: Product) {
  const product = await prisma.product.create({ data: input });
  return product;
}
