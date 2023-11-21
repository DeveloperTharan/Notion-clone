import React from "react";
import { CiCirclePlus } from "react-icons/ci";

interface itemProp {
  onClick: () => void;
  label: string;
}

export default function Item({ onClick, label }: itemProp) {
  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: "12px",
      }}
      className=""
    ></div>
  );
}
