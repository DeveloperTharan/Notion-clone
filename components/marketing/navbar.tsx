import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { cn } from "@/lib/utils";
import { auth, signIn } from "@/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { navconstant } from "@/constants/nav-constant";
import { UserButton } from "@/components/user-btn";
import { AuthModel } from "@/components/models/auth-model";

export const NavBar = async () => {
  const session = await auth();

  if (session) {
    redirect("/workspace");
  }

  return (
    <div
      className={cn(
        "w-full h-fit p-3 flex flex-row justify-between items-center fixed top-0 left-0 bg-background z-50 shadow-md"
      )}
    >
      <div className="flex flex-row items-center gap-x-7">
        <Link href={"/"} className="flex items-center justify-center gap-x-2">
          <Image src={"/logo.png"} alt="logo" width={40} height={40} />
          <span className="text-lg font-semibold">Notion</span>
        </Link>
        <div className="hidden lg:flex flex-row gap-x-6 items-center justify-center">
          {navconstant.map((data, _) => (
            <DropdownMenu key={data.id}>
              <DropdownMenuTrigger className="font-semibold">
                {data.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{data.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {data.items?.map((data, _) => (
                  <DropdownMenuItem key={data.id}>{data.name}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-x-5 items-center justify-center">
        {!session && (
          <>
            <AuthModel>
              <Button
                size={"default"}
                variant={"ghost"}
                className="hidden md:block"
              >
                Reques a demo
              </Button>
            </AuthModel>
            <span className="hidden md:block text-2xl text-neutral-400 font-thin">
              |
            </span>
            <AuthModel>
              <Button
                size={"default"}
                variant={"ghost"}
                className="bg-neutral-800 text-neutral-50 md:bg-background md:text-neutral-800"
              >
                Login
              </Button>
            </AuthModel>
            <AuthModel>
              <Button size={"default"} className="hidden md:block">
                Get notion free
              </Button>
            </AuthModel>
          </>
        )}
        {session && <UserButton session={session} />}
      </div>
    </div>
  );
};
