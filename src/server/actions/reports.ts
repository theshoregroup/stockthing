"use server";

import { convertArrayToCSV } from "convert-array-to-csv";
import { prisma } from "../db";

export async function generateReport(id: string) {
  const reportDetails = await prisma.productsInStores.findMany({
    where: { storeId: id },
  });

  const asCSV = convertArrayToCSV(reportDetails);

  return asCSV;
}
