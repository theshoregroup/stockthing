"use client";

import { Store } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ClipboardList, DownloadCloud, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const columns: ColumnDef<Store>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Download Report",
    cell: ({ row }) => {
      // const [isGetting, startGetting] = useTransition();

      // function get() {
      //   startGetting(() => {
      //     fetch(`/reports/${row.original.id}`, {
      //       method: "GET",
      //     });
      //   });
      // }

      return (
        <>
          <Link
            prefetch={false}
            target="_blank"
            href={`/reports/${row.original.id}`}
          >
            <Button>
              <DownloadCloud className="mr-2 h-5 w-5" />
              Download
            </Button>
          </Link>
        </>
      );
    },
  },
];
