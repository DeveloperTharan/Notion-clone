import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

import { SideBar } from "@/components/main/sidebar";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Workspace | Notion",
  description: "Workspace | Notion",
};

export default async function Mainlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/");

  const docs = await db.document.findMany({
    where: {
      userId: session.user?.id,
    }
  });

  return (
    <SessionProvider session={session}>
      <main className="w-full h-full flex">
        <div className="h-full sticky top-0 left-0 bg-secondary scrollbar-hide">
          <SideBar docs={docs} />
        </div>
        <section className="flex-1 h-full overflow-y-auto">{children}</section>
        <Toaster
          position="top-right"
          dir="ltr"
          closeButton
          duration={3000}
          expand={false}
          theme="light"
        />
      </main>
    </SessionProvider>
  );
}
