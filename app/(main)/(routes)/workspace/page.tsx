"use client";

import React from "react";
import empty from "@/public/empty.png";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { FaCirclePlus } from "react-icons/fa6";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function WorkArea() {
  const { user } = useUser();

  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "untitled" });

    toast.promise(promise, {
      loading: "Creating a new Note...",
      success: "New note created.",
      error: "Failed to create a new note.",
      duration: 1000,
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <aside>
        <Image src={empty} alt="empty" height={300} width={300} />
      </aside>
      <h2 className="text-sm font-medium capitalize">
        welcome to {user!.fullName}&apos;s notion
      </h2>
      <button
        className="btn bg-base-content text-base-100 hover:bg-base-content hover:text-base-100"
        onClick={onCreate}
      >
        <FaCirclePlus />
        Create a note 
      </button>
    </div>
  );
}
