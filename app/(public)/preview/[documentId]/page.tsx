"use client";

import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import NavBar from "@/app/(main)/(routes)/workspace/components/NavBar";
import ToolBar from "@/app/(main)/(routes)/workspace/[documentId]/components/ToolBar";
import CoverImage from "@/app/(main)/(routes)/workspace/[documentId]/components/CoverImage";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

export default function DocumentIdPage({ params }: DocumentIdPageProps) {
  const Editor = useMemo(
    () =>
      dynamic(
        () =>
          import(
            "@/app/(main)/(routes)/workspace/[documentId]/components/Editor"
          ),
        { ssr: false }
      ),
    []
  );

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const updateDocument = useMutation(api.documents.update);

  const handleOnChange = (Content: string) => {
    updateDocument({
      id: params.documentId,
      content: Content,
    });
  };

  return (
    <>
      {document === null ? (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-md 
          font-normal text-base-content"
        >
          Not found!
        </div>
      ) : (
        <>
          {document === undefined ? (
            <div className="mt-32">
              <div className="skeleton max-w-xl lg:max-w-2xl xl:mxa-w-3xl 2xl:max-w-4xl mx-auto h-8" />
            </div>
          ) : (
            <>
              <NavBar preview />
              <div className="pb-40">
                <CoverImage preview url={document.coverImage} />
                <div className="max-w-xl lg:max-w-2xl xl:mxa-w-3xl 2xl:max-w-4xl mx-auto relative -mt-6 z-30">
                  <ToolBar preview initialData={document} />
                  <Editor
                    editable={false}
                    onChange={handleOnChange}
                    initialData={document.content}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
