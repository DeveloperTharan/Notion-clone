"use client";

import React from "react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { GoPlusCircle } from "react-icons/go";
import { createDocument } from "@/actions/document";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function Workspace() {
  const { data } = useSession();
  const router = useRouter();

  if (!data) return redirect("/");

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
      <p>Welcom to {data.user?.name}&apos;s Notion</p>
      <form
        action={async () => {
          await createDocument().then((data) => {
            if (data.success) return toast.success(data.success);
            if (data.error) return toast.error(data.error);
          }).finally(() => router.refresh());
        }}
      >
        <Button
          variant={"default"}
          className="flex gap-3 items-center"
          size={"lg"}
          type="submit"
        >
          <GoPlusCircle className="w-4 h-4" />
          Create a note
        </Button>
      </form>
    </div>
  );
}
