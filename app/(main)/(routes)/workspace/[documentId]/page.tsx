"use client";

import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import NavBar from "../components/NavBar";
import ToolBar from "./components/ToolBar";
import CoverImage from "./components/CoverImage";
import Editor from "./components/Editor";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

export default function page({ params }: DocumentIdPageProps) {
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
              <NavBar />
              <div className="pb-40">
                <CoverImage url={document.coverImage} />
                <div className="max-w-xl lg:max-w-2xl xl:mxa-w-3xl 2xl:max-w-4xl mx-auto relative -mt-6 z-30">
                  <ToolBar initialData={document} />
                  <Editor
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
