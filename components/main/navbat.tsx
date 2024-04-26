"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { DocumentInput } from "./document-input";
import { handleFavorite } from "@/actions/document";

import { Button } from "../ui/button";

import { GoStar } from "react-icons/go";
import { FaStar } from "react-icons/fa6";
import { LuClock2 } from "react-icons/lu";
import { MdOutlineChat } from "react-icons/md";
import { IoIosStarOutline } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Publish } from "./publish";

interface NavBarProps {
  preview?: boolean;
  id: string | undefined;
  title: string | undefined | null;
  icon: string | undefined | null;
  isFavorite: boolean | undefined;
  isPublished: boolean | undefined;
  url: string | null;
}

export const NavBar = ({
  preview,
  id,
  icon,
  title,
  isFavorite,
  isPublished,
  url
}: NavBarProps) => {
  const [Open, setOpen] = useState(false);

  const router = useRouter();

  const handleFavoriteDoc = async () => {
    await handleFavorite(id!)
      .then((data) => {
        if (data.success) return toast.success(data.success);
        if (data.error) return toast.error(data.error);
      })
      .finally(() => {
        router.refresh();
      });
  };

  return (
    <>
      {!preview && (
        <nav className="w-full h-full flex items-center justify-between p-2 shadow-sm">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setOpen(true)}
            className="text-muted-foreground ml-5"
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
              <Publish id={id} isPublished={isPublished} url={url} />
            <Button variant={"ghost"} size={"icon"} onClick={handleFavoriteDoc}>
              {isFavorite ? (
                <FaStar className="w-5 h-5 text-muted-foreground" />
              ) : (
                <GoStar className="w-5 h-5 text-muted-foreground" />
              )}
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
