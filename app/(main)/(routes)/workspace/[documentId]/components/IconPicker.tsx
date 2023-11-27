"use client";

import React from "react";
import EmojiPicker from "emoji-picker-react";

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
}

export default function IconPicker({
  onChange,
  children,
}: IconPickerProps) {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="">
        {children}
      </div>
      <div className="dropdown-content z-50 p-3 shadow bg-base-100 rounded-box w-full">
        <EmojiPicker 
        height={350}
        onEmojiClick={(data) => onChange(data.emoji)}        
        />        
      </div>
    </div>
  );
}
