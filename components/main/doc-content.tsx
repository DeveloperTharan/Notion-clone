"use client";

import { Document } from "@prisma/client";
import React, { useMemo } from "react";
import { CoverImage } from "./cover-image";
import { ToolBar } from "./toolbar";
import dynamic from "next/dynamic";
import debounce from "debounce";
import { handleBody } from "@/actions/document";

interface DocContentProps {
  document: Document | null;
  preview: boolean;
  editable: boolean;
}

export const DocContent = ({
  document,
  editable,
  preview,
}: DocContentProps) => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("./editor").then((mod) => mod.Editor), {
        ssr: false,
      }),
    []
  );

  const handleOnChange = debounce(async (body: string) => {
    await handleBody(document?.id!, body);
  }, 1000);

  return (
    <div className="pb-40 w-full">
      <CoverImage url={document?.coverImage} preview={preview} />
      <div className="max-w-xl lg:max-w-2xl xl:mxa-w-3xl 2xl:max-w-4xl mx-auto relative -mt-6 z-30 px-5">
        <ToolBar initialData={document} preview={preview} />
        <Editor
          onChange={handleOnChange}
          initialData={document?.body}
          editable={editable}
        />
      </div>
    </div>
  );
};
