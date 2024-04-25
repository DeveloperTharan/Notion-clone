import { cn } from "@/lib/utils";
import React from "react";

import { IconType } from "react-icons";
import { GoPlus } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdArrowForwardIos } from "react-icons/md";

interface ItemProp {
  id?: string;
  label: string;
  Icon: IconType;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  level?: number;
  onClick?: () => void;
  onExpand?: () => void;
}

export const Item = ({
  id,
  label,
  Icon,
  documentIcon,
  active,
  expanded,
  level,
  onClick,
  onExpand,
}: ItemProp) => {
  const handleExpand = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    onExpand?.();
  };
  const handleCreateInside = () => {};

  return (
    <div
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={cn(
        "w-full flex items-center cursor-pointer hover:bg-primary/10 p-1.5 rounded-md group",
        active && "bg-primary/10"
      )}
    >
      {!!id && (
        <MdArrowForwardIos
          className={cn(
            "h-5 w-5 text-muted-foreground hidden group-hover:block rounded-md hover:bg-primary/10 p-[3px]",
            expanded ? "rotate-90" : "rotate-0"
          )}
          role="button"
          onClick={handleExpand}
        />
      )}
      <div
        className="w-full h-full flex items-center gap-x-3"
        role="button"
        onClick={onClick}
      >
        {documentIcon ? (
          <div className="group-hover:hidden shrink-0 mr-2 text-[18px]">
            {documentIcon}
          </div>
        ) : (
          <Icon className={cn("w-4 h-4", !!id && "group-hover:hidden")} />
        )}
        <span
          className={cn(
            "truncate font-medium text-xs text-muted-foreground",
            !!id && "group-hover:pl-2"
          )}
        >
          {label}
        </span>
      </div>
      {!!id && (
        <div className="ml-auto flex items-center gap-x-1">
          <GoPlus
            className="opacity-0 group-hover:opacity-100 p-[2px] hover:bg-primary/10 text-muted-foreground h-5 w-5 rounded-md"
            role="button"
            onClick={handleCreateInside}
          />
          <HiDotsHorizontal
            id={id}
            className="opacity-0 group-hover:opacity-100 p-[2px] hover:bg-primary/10 text-muted-foreground h-5 w-5 rounded-md"
            role="button"
          />
        </div>
      )}
    </div>
  );
};
