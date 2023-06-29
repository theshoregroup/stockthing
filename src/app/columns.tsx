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
import { generateReport } from "~/server/actions/reports";

export const columns: ColumnDef<Store>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Download Report",
    cell: ({ row }) => {
      const [isGetting, startGetting] = useTransition();

      function get() {
        startGetting(async () => {
          const asString = await generateReport(row.original.id);

          const url = window.URL.createObjectURL(
            new Blob([asString], { type: "text/csv" })
          );

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `StockThingReport-${
              row.original.name
            }_${new Date().toLocaleDateString()}.csv`
          );

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
        });
      }

      return (
        <>
          <Button onClick={() => get()}>
            <DownloadCloud className="mr-2 h-5 w-5" />
            Download
          </Button>
        </>
      );
    },
  },
];
