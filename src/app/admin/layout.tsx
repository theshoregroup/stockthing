import { currentUser } from "@clerk/nextjs";
import {
  ClipboardCheck,
  PackageSearch,
  Sliders,
  Store,
  Users,
} from "lucide-react";
import Link from "next/link";
import Header from "~/components/ui/Header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user || user.publicMetadata.isAdmin !== true) {
    throw new Error("Not authorized");
  }

  return (
    <>
      <Header title="Admin" />

      <div className="grid grid-cols-2 gap-5 px-5 md:grid-cols-3">
        <Link className="group" href="/admin">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-tr from-blue-700 via-cyan-500 to-blue-400 p-2 text-blue-50 shadow-lg transition-all ease-in-out hover:shadow-xl md:p-5">
            <span className="text-2xl md:text-3xl">General</span>
            <Sliders className="absolute -bottom-6 -right-6 h-32 w-32 opacity-50 transition-all ease-in-out group-hover:bottom-1 group-hover:right-1" />
          </div>
        </Link>
        <Link
          className="group"
          href="https://dashboard.clerk.com/apps/app_2Rmlc1KYkA7VIF88fuuuNQAI4fK/instances/ins_2Rmlc2CyONLaOIlmDxpbs18BrIL"
        >
          <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-tr from-emerald-700 via-lime-500 to-green-400 p-2 text-yellow-50  shadow-lg transition-all ease-in-out hover:shadow-xl md:p-5">
            <span className="text-2xl md:text-3xl">
              Users
              <Users className="absolute -bottom-6 -right-6 h-32 w-32 opacity-50 transition-all ease-in-out group-hover:bottom-1 group-hover:right-1" />
            </span>
          </div>
        </Link>
        <Link className="group" href="/admin/stores">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-tr from-indigo-700 via-purple-500 to-indigo-400 p-2 text-yellow-50  shadow-lg transition-all ease-in-out hover:shadow-xl md:p-5">
            <span className="text-2xl md:text-3xl">
              Reports
              <ClipboardCheck className="absolute -bottom-6 -right-6 h-32 w-32 opacity-50 transition-all ease-in-out group-hover:bottom-1 group-hover:right-1" />
            </span>
          </div>
        </Link>
        <Link className="group" href="/admin/products">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-tr from-yellow-700 via-amber-500 to-orange-400 p-2 text-yellow-50  shadow-lg transition-all ease-in-out hover:shadow-xl md:p-5">
            <span className="text-2xl md:text-3xl">
              Products
              <PackageSearch className="absolute -bottom-6 -right-6 h-32 w-32 opacity-50 transition-all ease-in-out group-hover:bottom-1 group-hover:right-1" />
            </span>
          </div>
        </Link>
      </div>
      <div className="p-5">{children}</div>
    </>
  );
}
