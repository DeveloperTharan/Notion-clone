"use client";

import React, { useTransition } from "react";
import Image from "next/image";

import { Session } from "next-auth";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { CiSettings } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegCircleUser, FaRegUser } from "react-icons/fa6";
import { SignOut } from "@/actions/sign-out";
import { Spinner } from "./ui/spinner";

export const UserButton = ({
  session,
  align,
}: {
  session: Session;
  align: "center" | "end" | "start" | undefined;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger className="w-full flex items-center gap-x-3 cursor-pointer hover:bg-primary/10 p-2 rounded-md">
        {session.user?.image ? (
          <Image
            src={session.user?.image!}
            alt="user"
            width={28}
            height={28}
            className="object-cover rounded-lg"
          />
        ) : (
          <FaRegCircleUser className="h-10 w-10" />
        )}
        <span className="text-xs font-semibold text-muted-foreground">
          {session.user?.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align={align}
        className="w-80"
      >
        <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-x-3">
          <FaRegUser /> {session.user?.name}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-x-3">
          <CiSettings /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-x-3"
          onClick={() => {
            startTransition(() => SignOut());
          }}
          disabled={isPending}
        >
          {isPending ? (
            <Spinner size={"lg"} />
          ) : (
            <>
              <AiOutlineLogout /> LogOut
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
