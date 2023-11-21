"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export function GetNotionFreeHero() {
  return (
    <>
      <button className="btn bg-base-content text-base-100 hover:bg-base-content mt-5">
        Get Notion free <FaArrowRight className="ms-4 mt-1" />
      </button>
    </>
  );
}

export function TryNotion() {
  return (
    <>
      <button className="btn bg-base-content text-base-100 hover:bg-base-content rounded-md cursor-pointer">
        Try Notion free
      </button>
    </>
  );
}

export function RequestNotion() {
  return (
    <>
      <button className="text-blue-600 hover:underline cursor-pointer flex gap-2">
        Request a demo <FaArrowRight className="mt-[6px] font-thin" />
      </button>
    </>
  );
}
