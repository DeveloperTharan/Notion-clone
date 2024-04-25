"use client";

import React from "react";
import EmojiPicker from "emoji-picker-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
}

export const IconPicker = ({ onChange, children }: IconPickerProps) => {
  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align={"center"} className="w-full">
        <EmojiPicker
          height={350}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
