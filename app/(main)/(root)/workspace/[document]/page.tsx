import { DocContent } from "@/components/main/doc-content";
import { NavBar } from "@/components/main/navbat";
import { Skeleton } from "@/components/ui/skeleton";
import { getDocumentById } from "@/data/document";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { document: string };
}): Promise<Metadata> {
  const { document } = params;
  const res = await getDocumentById(document);

  return {
    title: `${res?.icon} ${res?.title} | Notion`,
  };
}

export default async function DocumentPage({
  params,
}: {
  params: { document: string };
}) {
  const { document } = params;
  const res = await getDocumentById(document);

  return (
    <>
      {!document ? (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-md 
          font-normal text-base-content"
        >
          Sorry! Not found?
        </div>
      ) : (
        <>
          {document === undefined ? (
            <div className="mt-32">
              <Skeleton className="max-w-xl lg:max-w-2xl xl:mxa-w-3xl 2xl:max-w-4xl mx-auto h-8" />
            </div>
          ) : (
            <>
              <div className="w-[92%] lg:w-[96%] xl:w-[97%] h-10 sticky top-0 left-20 bg-background z-50">
                <NavBar
                  id={res?.id}
                  title={res?.title}
                  icon={res?.icon}
                  preview={false}
                />
              </div>
              <div className="w-full h-auto overflow-auto">
                <DocContent document={res} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
