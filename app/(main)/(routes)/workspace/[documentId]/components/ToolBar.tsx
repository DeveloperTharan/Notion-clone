"use client";

import { Doc } from "@/convex/_generated/dataModel";
import React, { ElementRef, useRef, useState } from "react";
import IconPicker from "./IconPicker";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { CiFaceSmile, CiImageOn } from "react-icons/ci";

interface ToolBarProp {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export default function ToolBar({ initialData, preview }: ToolBarProp) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const handleEnableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const handleDisableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleDisableInput();
    }
  };

  const handleOnIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const handleOnRemoveIcon = () => {
    removeIcon({
      id: initialData._id
    })
  }

  return (
    <div className="group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon mb-2">
          <IconPicker onChange={handleOnIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <button
            className="btn btn-ghost rounded-full opacity-0 group-hover/icon:opacity-100 text-base-content"
            onClick={handleOnRemoveIcon}
          >
            ✕
          </button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-1">
        {!initialData.icon && !preview && (
          <IconPicker onChange={handleOnIconSelect}>
            <button
              className="text-gray-500 text-xs flex items-center hover:bg-base-200 px-2 py-1 rounded-md"
            >
              <CiFaceSmile className="h-4 w-4 mr-2 text-gray-500" />
              Add icon
            </button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <button
            onClick={() => {}}
            className="text-gray-500 text-xs flex items-center hover:bg-base-200 px-2 py-1 rounded-md"
          >
            <CiImageOn className="h-4 w-4 mr-2 text-gray-500" />
            Add cover
          </button>
        )}
      </div>
      {isEditing && !preview ? (
        <input
          type="text"
          placeholder="Untitled"
          ref={inputRef}
          onBlur={handleDisableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-[40px] bg-transparent font-bold outline-none text-[#3F3F3F] truncate w-full"
        />
      ) : (
        <div
          onClick={handleEnableInput}
          className="pb-[11.5px] text-[40px] font-bold truncate outline-none text-[#3F3F3F] w-full"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
}
