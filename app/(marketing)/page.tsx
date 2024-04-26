import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="relative h-auto min-h-screen px-3 xl:px-16 3xl:px-44 mt-20 flex flex-col gap-7 items-center text-center">
      <div className="text-center mt-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-semibold">
          Write, plan, share.
        </h1>
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-semibold">
          With AI at your side.
        </h1>
        <p className="text-sm md:text-ms lg:text-xl font-semibold my-4 text-wrap">
          Notion is the connected workspace where better, faster work happens.
        </p>
        <Button variant={"default"}>
          Get Notion free
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            className="ms-4 mt-1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
          </svg>
        </Button>
      </div>
      <aside className="mt-10">
        <Image src={"/home-hero.svg"} alt="hero" width={800} height={800} />
      </aside>
    </div>
  );
}
