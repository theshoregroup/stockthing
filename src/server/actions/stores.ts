"use server";

import { Store } from "@prisma/client";
import { prisma } from "../db";
import { revalidatePath } from "next/cache";

export async function handleGetStores() {
  const stores = await prisma.store.findMany({
    orderBy: { name: "asc" },
  });
  return stores;
}

export async function handleAddStore(input: Store) {
  const store = await prisma.store.create({ data: input });
  revalidatePath("/admin");
  return store;
}

export async function handleDeleteStore(storeId: string) {
  const store = await prisma.store.delete({
    where: { id: storeId },
  });
  revalidatePath("/admin");
  return store;
}
