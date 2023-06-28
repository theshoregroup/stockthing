"use server";

import { prisma } from "../db";

export async function handleGetStores() {
  const stores = await prisma.store.findMany({
    take: 20,
  });
  return stores;
}
