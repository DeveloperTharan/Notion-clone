"use client";

import { Document } from "@prisma/client";
import React from "react";
import { CoverImage } from "./cover-image";
import { ToolBar } from "./toolbar";
import { Editor } from "./editor";

export const DocContent = ({ document }: { document: Document | null }) => {
  const handleOnChange = () => {};
  return (
    <div className="pb-40 w-full">
      <CoverImage url={document?.coverImage} />
      <div className="max-w-xl lg:max-w-2xl xl:mxa-w-3xl 2xl:max-w-4xl mx-auto relative -mt-6 z-30">
        <ToolBar initialData={document} />
        <Editor onChange={handleOnChange} initialData={document?.body} />
        content
      </div>
    </div>
  );
};
