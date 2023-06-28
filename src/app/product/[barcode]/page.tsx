import { prisma } from "~/server/db";
import { notFound } from "next/navigation";
import { UserButton, currentUser } from "@clerk/nextjs";
import ProductForm from "./ProductForm";
import { Button } from "~/components/ui/button";
import { PackageCheck, RotateCcw } from "lucide-react";

export default async function ProductPage({
  params,
}: {
  params: { barcode: string };
}) {
  const user = await currentUser();
  const product = await prisma.product.findUnique({
    where: {
      barcode: params.barcode,
    },
  });

  if (!product) return notFound();

  return (
    <>
      <div className="relative bg-gray-200 p-5 pt-20">
        <div className="absolute right-5 top-5">
          <UserButton />
        </div>
        <span className="text-sm text-gray-500">{product.barcode}</span>
        <h1>{product.name}</h1>
        <p className="text-sm text-gray-500">
          Manage in-store stock and merchandising.
        </p>
        <div className="mt-2 flex gap-2">
          <Button>
            <RotateCcw className="mr-1 h-5 w-5" />
            Reload
          </Button>
          <Button
            variant={"secondary"}
            disabled={!user?.publicMetadata.isAdmin}
          >
            <PackageCheck className="mr-1 h-5 w-5" />
            Edit Product
          </Button>
        </div>
      </div>
      <div className="p-5">
        <ProductForm product={product} />
      </div>
    </>
  );
}
