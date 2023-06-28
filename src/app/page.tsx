"use client";
import { Medal, Move, Store } from "lucide-react";
import {
  useStore,
  StoreDispatchInADialog,
} from "~/components/context/StoreContext";
import Header from "~/components/ui/Header";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";

export default function Home() {
  const currentStore = useStore();
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

        <div className="my-2 rounded-xl bg-gradient-to-tr from-blue-500 via-sky-400  to-cyan-400 p-5 text-white">
          <div>
            <Store className="h-7 w-7" />
            <h4>
              {currentStore.store
                ? `Your active store is currently ${currentStore.store.name}`
                : `Please select a store to get started`}
            </h4>
          </div>
          <p className="mb-2 text-sm text-gray-100">
            You can change your active store at any time from the navigation
            menu.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"secondary"}>
                <Move className="mr-1 h-5 w-5" />
                Change Store
              </Button>
            </DialogTrigger>
            <StoreDispatchInADialog />
          </Dialog>
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
