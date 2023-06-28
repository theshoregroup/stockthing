// app/layout.tsx
import "~/styles/globals.css";
import { Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import AppNav from "~/components/ui/AppNav";
import { cn } from "~/lib/utils";
import { prisma } from "~/server/db";
import { StoreProvider } from "~/components/context/StoreContext";
import { Metadata } from "next";

const spacegrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-default",
});

export const metadata: Metadata = {
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  title: "StockThing",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stores = await prisma.store.findMany();

  return (
    <ClerkProvider>
      <StoreProvider storeInput={stores[0]!}>
        <html lang="en">
          <body className={cn(spacegrotesk.className, "mb-10")}>
            {children}
            <AppNav />
          </body>
        </html>
      </StoreProvider>
    </ClerkProvider>
  );
}
