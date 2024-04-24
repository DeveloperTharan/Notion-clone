import React from "react";
import Image from "next/image";

import { signOut } from "@/auth";
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

export const UserButton = ({ session }: { session: Session }) => {
  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger>
        {session.user?.image ? (
          <Image
            src={session.user?.image!}
            alt="user"
            width={35}
            height={35}
            className="object-cover rounded-full"
          />
        ) : (
          <FaRegCircleUser className="h-10 w-10" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        sideOffset={15}
        alignOffset={15}
        align="end"
      >
        <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-x-3">
          <FaRegUser /> {session.user?.name}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-x-3">
          <CiSettings /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit" className="flex items-center gap-x-3">
              <AiOutlineLogout /> LogOut
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
