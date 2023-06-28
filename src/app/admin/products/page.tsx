import { DataTable } from "~/app/admin/products/DataTable";
import { columns } from "./columns";
import { prisma } from "~/server/db";

export default async function ProductsManagementPage() {
  const products = await prisma.product.findMany();

  return (
    <>
      <div>
        <h2>Manage Products</h2>
        <p className="text-sm text-gray-500">
          Add and manage your products here.
        </p>
      </div>
      <DataTable columns={columns} data={products} />
    </>
  );
}
