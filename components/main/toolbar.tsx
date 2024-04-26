"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import debounce from "debounce";
import { Document } from "@prisma/client";
import { handleIcon, handleRename } from "@/actions/document";

import { IconPicker } from "../emoji-picker";
import { CoverImageModel } from "../models/coverimage-uplode";

import { CiFaceSmile, CiImageOn } from "react-icons/ci";

interface ToolBarProps {
  initialData: Document | null;
  preview?: boolean;
}

export const ToolBar = ({ initialData, preview }: ToolBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData?.title);

  const router = useRouter();

  const handleEnableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData?.title);
      inputRef.current?.focus();
    }, 0);
  };

  const handleDisableInput = () => setIsEditing(false);

  const onInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    handleRename(initialData?.id!, e.target.value)
      .then((data) => {
        if (data.success) return toast.success(data.success);
        if (data.error) return toast.error(data.error);
      })
      .finally(() => {
        router.refresh();
      });
  }, 3000);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleDisableInput();
    }
  };

  const handleOnIconSelect = (icon: string) => {
    handleIcon("Add", initialData?.id!, icon)
      .then((data) => {
        if (data.success) return toast.success(data.success);
        if (data.error) return toast.error(data.error);
      })
      .finally(() => {
        router.refresh();
      });
  };

  const handleOnRemoveIcon = () => {
    handleIcon("Remove", initialData?.id!)
    .then((data) => {
      if (data.success) return toast.success(data.success);
      if (data.error) return toast.error(data.error);
    })
    .finally(() => {
      router.refresh();
    });
  };
  return (
    <div className="group relative">
      {!!initialData?.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon mb-2">
          <IconPicker onChange={handleOnIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData?.icon}
            </p>
          </IconPicker>
          <button
            className="px-4 py-2 rounded-full opacity-0 group-hover/icon:opacity-100 hover:bg-base-200 text-base-content"
            onClick={handleOnRemoveIcon}
          >
            ✕
          </button>
        </div>
      )}
      {!!initialData?.icon && preview && (
        <p className="text-6xl">{initialData?.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-1">
        {!initialData?.icon && !preview && (
          <IconPicker onChange={handleOnIconSelect}>
            <button className="text-gray-500 text-xs flex items-center hover:bg-base-200 px-2 py-1 rounded-md whitespace-nowrap">
              <CiFaceSmile className="h-4 w-4 mr-2 text-gray-500" />
              Add icon
            </button>
          </IconPicker>
        )}
        {!initialData?.coverImage && !preview && (
          <CoverImageModel existingUrl={initialData?.coverImage!}>
            <button className="text-gray-500 text-xs flex items-center hover:bg-base-200 px-2 py-1 rounded-md whitespace-nowrap">
              <CiImageOn className="h-4 w-4 mr-2 text-gray-500" />
              Add cover
            </button>
          </CoverImageModel>
        )}
      </div>
      {isEditing && !preview ? (
        <input
          type="text"
          placeholder="Untitled"
          ref={inputRef}
          onBlur={handleDisableInput}
          onKeyDown={onKeyDown}
          defaultValue={initialData?.title!}
          onChange={onInput}
          className="text-[40px] bg-transparent font-bold outline-none text-[#3F3F3F] truncate w-full"
        />
      ) : (
        <div
          onClick={handleEnableInput}
          className="pb-[11.5px] text-[40px] font-bold truncate outline-none text-[#3F3F3F] w-full"
        >
          {initialData?.title}
        </div>
      )}
    </div>
  );
};
