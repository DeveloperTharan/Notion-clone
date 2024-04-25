"use client";

import React, { useState } from "react";
import { DocumentInput } from "./document-input";
import { Button } from "../ui/button";
import { IoIosStarOutline } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlineChat } from "react-icons/md";
import { LuClock2 } from "react-icons/lu";

interface NavBarProps {
  preview?: boolean;
  id: string | undefined;
  title: string | undefined | null;
  icon: string | undefined | null;
}

export const NavBar = ({ preview, id, icon, title }: NavBarProps) => {
  const [Open, setOpen] = useState(false);
  return (
    <>
      {!preview && (
        <nav className="w-full h-full flex items-center justify-between pr-1 py-2">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setOpen(true)}
            className="text-muted-foreground"
          >
            {icon} {title}
          </Button>
          {Open && (
            <DocumentInput
              id={id!}
              title={title!}
              docicon={icon!}
              setClose={setOpen}
            />
          )}
          <div className="flex items-center justify-center gap-x-1">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="text-muted-foreground"
            >
              Publish
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <IoIosStarOutline className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <MdOutlineChat className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <LuClock2 className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <HiOutlineDotsHorizontal className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </nav>
      )}
    </>
  );
};
