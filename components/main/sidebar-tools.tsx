"use client";

import React, { useEffect, useState } from "react";

import { Document } from "@prisma/client";
import { useSession } from "next-auth/react";
import { DocumentNode, StructureData } from "@/utils/structure-data";

import { Item } from "./item";
import { Spinner } from "../ui/spinner";
import { UserButton } from "../user-btn";
import { DocumentList } from "./document-list";

import { CiImport } from "react-icons/ci";
import { PiPlusThin } from "react-icons/pi";
import { BsFillTrash2Fill } from "react-icons/bs";
import { HiOutlineTemplate } from "react-icons/hi";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { GoClock, GoPeople, GoPlusCircle } from "react-icons/go";

interface SideBarProps {
  docs: Document[];
}

export const SideBarTools = ({ docs }: SideBarProps) => {
  const [documents, setDocuments] = useState<DocumentNode[] | undefined>(
    undefined
  );
  const { data } = useSession();

  if (!data) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  useEffect(() => {
    const data = StructureData(docs);
    setDocuments(data);
  }, [docs]);

  const handleCreatePage = () => {};

  return (
    <div className="w-full h-full px-4 py-2 flex flex-col gap-3">
      <div className="w-[90%]">
        <UserButton session={data} align="start" />
      </div>
      <div className="w-full flex flex-col items-center gap-1 text-muted-foreground font-semibold">
        <Item label="Search" Icon={IoSearch} />
        <Item label="Settings" Icon={IoSettingsOutline} />
        <Item label="Update" Icon={GoClock} />
        <Item label="New Page" Icon={GoPlusCircle} onClick={handleCreatePage} />
      </div>

      <div className="mt-2">
        <DocumentList documents={documents} />
      </div>

      <div className="mb-4">
        <Item label="New Page" Icon={PiPlusThin} onClick={handleCreatePage} />
      </div>

      <div className="w-full flex flex-col items-center gap-1 text-muted-foreground font-semibold">
        <Item label="Create a Teamspace" Icon={GoPeople} />
        <Item label="Template" Icon={HiOutlineTemplate} />
        <Item label="Import" Icon={CiImport} />
        <Item label="Trash" Icon={BsFillTrash2Fill} />
      </div>
    </div>
  );
};
