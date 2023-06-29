import { Plus, StoreIcon } from "lucide-react";
import { DataTable } from "~/components/ui/BasicDataTable";
import { prisma } from "~/server/db";
import { columns } from "./storesCols";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import type { Store } from "@prisma/client";
import NewStoreForm from "./newStoreForm";

export default async function AdminPage() {
  const stores = await prisma.store.findMany();
  return (
    <>
      <div className="rounded-xl bg-gray-100 p-5">
        <StoreIcon className="h-7 w-7" />
        <h4>Manage available stores</h4>
        <p className="text-sm text-gray-500">
          These stores will be available to be selected from when saving stock
          level information.
        </p>
        <div className="py-2">
          <DataTable
            columns={columns}
            data={stores}
            optionalButton={
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-1 h-5 w-5" />
                    Add Store
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a new store</DialogTitle>
                  </DialogHeader>
                  <NewStoreForm />
                </DialogContent>
              </Dialog>
            }
          />
        </div>
      </div>
    </>
  );
}
