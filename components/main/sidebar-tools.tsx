import React from "react";

import { useSession } from "next-auth/react";

import { UserButton } from "../user-btn";

import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { GoClock, GoPeople, GoPlusCircle } from "react-icons/go";
import { HiOutlineTemplate } from "react-icons/hi";
import { CiImport } from "react-icons/ci";
import { BsFillTrash2Fill } from "react-icons/bs";

export const SideBarTools = () => {
  const { data } = useSession();

  if (!data) return <div>Loading...</div>;

  return (
    <div className="w-full h-full px-4 py-2 flex flex-col gap-3">
      <div className="w-[90%] flex items-center gap-x-3 cursor-pointer hover:bg-primary/10 p-2 rounded-md">
        <UserButton session={data} align="start" />
        <span className="text-xs font-semibold text-muted-foreground">
          {data.user?.name}
        </span>
      </div>
      <div className="w-full flex flex-col items-center gap-1 text-muted-foreground font-semibold">
        <div className="w-full flex items-center gap-x-3 cursor-pointer hover:bg-primary/10 p-1.5 rounded-md text-xs">
          <IoSearch className="w-4 h-4" />
          <span>Search</span>
        </div>
        <div className="w-full flex items-center gap-x-3 cursor-pointer hover:bg-primary/10 p-1.5 rounded-md text-xs">
          <IoSettingsOutline className="w-4 h-4" />
          <span>Settings</span>
        </div>
        <div className="w-full flex items-center gap-x-3 cursor-pointer hover:bg-primary/10 p-1.5 rounded-md text-xs">
          <GoClock className="w-4 h-4" />
          <span>Update</span>
        </div>
        <div
          className="w-full flex items-center gap-x-3 cursor-pointer hover:bg-primary/10 p-1.5 rounded-md text-xs"
          onClick={() => {}}
        >
          <GoPlusCircle className="w-4 h-4" />
          <span>New Page</span>
        </div>
      </div>

      <div className="mt-4">Documents</div>
      
      <div className="w-full flex flex-col items-center gap-1 text-muted-foreground font-semibold">
        <div className="w-full flex items-center gap-x-3 cursor-pointer hover:bg-primary/10 p-1.5 rounded-md text-xs">
          <GoPeople className="w-4 h-4" />
          <span>Create a Teamspace</span>
        </div>
        <div className="w-full flex items-center gap-x-3 cursor-pointer hover:bg-primary/10 p-1.5 rounded-md text-xs">
          <HiOutlineTemplate className="w-4 h-4" />
          <span>Template</span>
        </div>
        <div className="w-full flex items-center gap-x-3 cursor-pointer hover:bg-primary/10 p-1.5 rounded-md text-xs">
          <CiImport className="w-4 h-4" />
          <span>Import</span>
        </div>
        <div
          className="w-full flex items-center gap-x-3 cursor-pointer hover:bg-primary/10 p-1.5 rounded-md text-xs"
          onClick={() => {}}
        >
          <BsFillTrash2Fill className="w-4 h-4" />
          <span>Trash</span>
        </div>
      </div>
    </div>
  );
};
