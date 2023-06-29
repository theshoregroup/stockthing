import { convertArrayToCSV } from "convert-array-to-csv";
import { prisma } from "~/server/db";

export async function GET(
  request: Request,
  { params }: { params: { sId: string } }
) {
  const storeId = params.sId;

  const reportDetails = await prisma.productsInStores.findMany({
    where: { storeId },
  });

  const asCSV = convertArrayToCSV(reportDetails);

  var file = new File([asCSV], "foo.csv", { type: "text/csv" });
  return new Response(file);
}
