//app/page.tsx
import { Medal } from "lucide-react";
import Header from "~/components/ui/Header";
import { Badge } from "~/components/ui/badge";

export default function Home() {
  return (
    <div>
      <Header title="StockThing" />
      <div className="px-5">
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
      </div>
    </div>
  );
}
