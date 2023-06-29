import { ClipboardCheck, Medal, Move, Store } from "lucide-react";
import { DivToChangeStore } from "~/components/context/StoreContext";
import { DataTable } from "./ReportsTable";
import Header from "~/components/ui/Header";
import { Badge } from "~/components/ui/badge";
import { prisma } from "~/server/db";
import { columns } from "./columns";

export default async function Home() {
  const stores = await prisma.store.findMany();

  return (
    <>
      <Header title="StockThing" />
      <div className="space-y-5 px-5">
        <div className="rounded-xl bg-slate-100 p-5">
          <Medal className="h-10 w-10" />
          <h2 className="flex items-center gap-2 text-2xl">
            Welcome to StockThing <Badge>Beta</Badge>
          </h2>
          <p>
            This is a micro web-app intended to simplify stock intake and
            general merchandising tasks.
          </p>
        </div>

        <DivToChangeStore />

        <div className="rounded-xl bg-gradient-to-tr from-indigo-500 via-violet-400  to-indigo-400 p-5">
          <ClipboardCheck className="h-10 w-10 text-white" />
          <h4 className="text-white">Reports</h4>
          <p className="text-sm text-gray-100">
            View and export reports per store.
          </p>
          <DataTable columns={columns} data={stores} />
        </div>

        <div className="text-center">
          <span className="font-mono text-xs">
            StockThing 0.3alpha - limegorilla@tsg
          </span>
        </div>
      </div>
    </>
  );
}
