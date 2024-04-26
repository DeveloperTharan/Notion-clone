"use client";

import React from "react";

import { useEdgeStore } from "@/lib/edgestore";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import { Block, PartialBlock } from "@blocknote/core";

interface EditorProps {
  onChange: (value: string) => void;
  initialData?: string | null | undefined;
  editable?: boolean;
}

export const Editor = ({ onChange, initialData, editable }: EditorProps) => {
  const { edgestore } = useEdgeStore();

  const saveToStorage = (jsonBlocks: Block[]) => {
    onChange(JSON.stringify(jsonBlocks, null, 2));
  };

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  const editor = useCreateBlockNote({
    initialContent: initialData
      ? (JSON.parse(initialData) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={"light"}
        editable={editable}
        onChange={() => {
          saveToStorage(editor.document);
        }}
      />
    </div>
  );
};
