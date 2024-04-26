"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import debounce from "debounce";
import { IoIosClose } from "react-icons/io";
import { IconPicker } from "../emoji-picker";
import { handleIcon, handleRename } from "@/actions/document";

interface DocumentInputProps {
  id: string;
  docicon: string;
  title: string;
  setClose: Dispatch<SetStateAction<boolean>>;
}

export const DocumentInput = ({
  id,
  docicon,
  title,
  setClose,
}: DocumentInputProps) => {
  const router = useRouter();

  const handleIconSelect = async (icon: string) => {
    await handleIcon("Add" ,id, icon)
      .then((data) => {
        if (data.success) return toast.success(data.success);
        if (data.error) return toast.error(data.error);
      })
      .finally(() => {
        router.refresh();
        setClose(false);
      });
  };

  const onRenameChange = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      await handleRename(id, e.target.value)
        .then((data) => {
          if (data.success) return toast.success(data.success);
          if (data.error) return toast.error(data.error);
        })
        .finally(() => {
          router.refresh();
          setClose(false);
        });
    },
    1000
  );

  return (
    <div className="absolute w-80 h-12 bg-secondary border-primary/20 shadow-md rounded-md top-10 left-0 z-[9999]">
      <div className="relative flex items-center justify-center gap-x-2 top-3 px-3">
        <IoIosClose
          className="h-6 w-6 border rounded-full border-primary/10 p-[2px] absolute -top-5 -right-3"
          role="button"
          onClick={() => setClose(false)}
        />
        <IconPicker onChange={handleIconSelect}>
          <input
            type="text"
            role="button"
            defaultValue={docicon ? docicon : "Icon"}
            className="w-10 h-6 outline-none rounded-md px-2 focus:ring-1 focus:ring-gray-300"
          />
        </IconPicker>
        <input
          type="text"
          defaultValue={title}
          className="w-full h-6 outline-none rounded-md px-2 focus:ring-1 focus:ring-gray-300"
          onChange={onRenameChange}
        />
      </div>
    </div>
  );
};
