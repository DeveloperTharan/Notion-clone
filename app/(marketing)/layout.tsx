import { Footer } from "@/components/marketing/footer";
import { NavBar } from "@/components/marketing/navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Your connected workspace for wiki, docs & projects | Notion",
  description: "Your connected workspace for wiki, docs & projects | Notion",
};

export default function Mainlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-auto min-h-screen">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
