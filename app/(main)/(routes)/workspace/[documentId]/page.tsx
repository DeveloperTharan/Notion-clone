"use client";

import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import NavBar from "../components/NavBar";
import ToolBar from "./components/ToolBar";
import CoverImage from "./components/CoverImage";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

export default function page({ params }: DocumentIdPageProps) {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

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
                <div className="max-w-xl lg:max-w-2xl xl:mxa-w-3xl 2xl:max-w-4xl mx-auto relative -mt-6">
                 <ToolBar initialData={document}/> 
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
