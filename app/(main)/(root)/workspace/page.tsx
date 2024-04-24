import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { GoPlusCircle } from "react-icons/go";

export default async function Workspace() {
  const session = await auth();

  if (!session) return redirect("/");

  return (
    <div className="h-auto min-h-full flex flex-col space-y-2 items-center justify-center">
      <div className="relative w-fit hidden md:block">
        <Image
          src={"/create-page.webp"}
          alt="create"
          width={200}
          height={200}
          className="absolute -right-20 -top-20"
        />
        <Image
          src={"/create-page-2.webp"}
          alt="create"
          width={350}
          height={350}
          className="mt-20"
        />
      </div>
      <p>Welcom to {session.user?.name}'s Notion</p>
      <Button
        variant={"default"}
        className="flex gap-3 items-center"
        size={"lg"}
      >
        <GoPlusCircle className="w-4 h-4" />
        Create a note
      </Button>
    </div>
  );
}
