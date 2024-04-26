"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";

import debounce from "debounce";
import { ToolBar } from "./toolbar";
import { Document } from "@prisma/client";
import { CoverImage } from "./cover-image";
import { handleBody } from "@/actions/document";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

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

  const searchParams = useSearchParams();
  const { data } = useSession();

  const user = searchParams.get("user");
  const isPublished = searchParams.get("isPublished");

  const handleOnChange = debounce((body: string) => {
    handleBody(document?.id!, body);
  }, 1000);

  return (
    <>
      {!isPublished && user == data?.user?.id ? (
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
      ) : (
        <div>Private document</div>
      )}
    </>
  );
};
