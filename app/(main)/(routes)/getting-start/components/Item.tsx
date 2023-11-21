import { Id } from "@/convex/_generated/dataModel";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

interface itemProp {
  onClick?: () => void;
  label: string;
  open: boolean;
  icon: any;
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
}

export default function Item({
  onClick,
  label,
  open,
  icon: Icon,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level,
  onExpand,
}: itemProp) {
  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={`group min-h-[27px] text-sm py-[6px] pr-3 w-full hover:bg-base-200 flex items-center 
      justify-start text-base-content font-medium gap-2 rounded-md mt-2 ${
        active && "bg-base-300 text-gray-800"
      }`}
    >
      {!!id && (
        <div
          className="h-full rounded-md hover:bg-base-300 mr-1"
          onClick={() => {}}
        >
          <MdArrowForwardIos
            className={`h-5 w-5 shrink-0 text-gray-600 ms-2 ${
              expanded ? "rotate-90" : "rotate-0"
            } ${!open && "hidden"}`}
          />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <>
          {open ? (
            <Icon className="h-5 w-5 shrink-0 text-gray-600 ms-2" />
          ) : (
            <div className="tooltip tooltip-right" data-tip={label}>
              <Icon className="h-6 w-6 ms-0" />
            </div>
          )}
        </>
      )}
      <span
        className={`truncate text-gray-600 font-medium text-sm ${
          !open && "hidden"
        }`}
      >
        {label}
      </span>
      {isSearch && (
        <div
          className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 
          px-1.5 text-[10px] font-medium text-gray-600 opacity-100"
        ></div>
      )}
    </div>
  );
}
