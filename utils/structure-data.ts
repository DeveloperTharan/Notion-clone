import { Document } from "@prisma/client";

export interface DocumentNode extends Document {
  children?: DocumentNode[];
}

export const StructureData = (
  documentArray: Document[] | null,
  parentId: string | null = null
): DocumentNode[] | undefined => {
  if (!documentArray) return undefined;

  return documentArray
    .filter((document) => document.parentDocumentId === parentId)
    .map((document) => ({
      ...document,
      children: StructureData(documentArray, document.id),
    }));
};
