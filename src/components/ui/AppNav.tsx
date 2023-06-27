"use client";

import { useUser } from "@clerk/nextjs";
import { Camera, ClipboardCheck, Cog, Home, Sliders } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import Scanner from "./Scanner";

export default function AppNav() {
  const { user, isLoaded } = useUser();

  user?.publicMetadata;

  return (
    <nav className="fixed bottom-0 flex w-screen justify-around bg-white/20 p-1 backdrop-blur-md">
      <Link
        className="flex aspect-square h-14 w-14 flex-col items-center justify-center p-1"
        href="/"
      >
        <Home className="h-7 w-7" />
        <span className="text-xs">Home</span>
      </Link>
      <Link
        className="flex aspect-square h-14 w-14 flex-col items-center justify-center p-1"
        href="/lists"
      >
        <ClipboardCheck className="h-7 w-7" />
        <span className="text-xs">Checklist</span>
      </Link>
      <Dialog>
        <DialogTrigger className="flex aspect-square h-14 w-14 flex-col items-center justify-center rounded bg-green-100 p-1 text-green-700">
          <Camera className="h-7 w-7" />
          <span className="text-xs">Scan</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan</DialogTitle>
            <DialogDescription>
              Scan a barcode to add a product to your inventory.
            </DialogDescription>
          </DialogHeader>

          <Scanner />
        </DialogContent>
      </Dialog>
      <Link
        className="flex aspect-square h-14 w-14 flex-col items-center justify-center p-1"
        href="/settings"
      >
        <Cog className="h-7 w-7" />
        <span className="text-xs">Settings</span>
      </Link>
      {isLoaded && user?.publicMetadata?.isAdmin == true && (
        <Link
          className="flex aspect-square h-14 w-14 flex-col items-center justify-center p-1"
          href="/admin"
        >
          <Sliders className="h-7 w-7" />
          <span className="text-xs">Admin</span>
        </Link>
      )}
    </nav>
  );
}
