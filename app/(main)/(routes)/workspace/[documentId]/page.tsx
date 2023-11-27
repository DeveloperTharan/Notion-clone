"use client";

import React from "react";
import NavBar from "../components/NavBar";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import ToolBar from "./components/ToolBar";

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
            <div>Loding...</div>
          ) : (
            <>
              <NavBar />
              <div className="pb-40">
                <div className="h-[15vh]" />
                <div className="max-w-xl lg:max-w-2xl xl:mxa-w-3xl 2xl:max-w-4xl mx-auto">
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
