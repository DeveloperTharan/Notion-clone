"use server";

import { auth } from "@/auth";
import { processDocumentAndChildren } from "@/data/action-fun";
import {
  archiveDocument,
  deleteDocument,
  getDocumentById,
  restorDocument,
} from "@/data/document";
import { db } from "@/lib/db";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

const base_url = process.env.NEXT_BASE_URL;

export const createDocument = async (parentId?: string) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!session || !user) return { error: "Unauthorized!" };

    const parentDocumentId = parentId ?? parentId;

    const res = await db.document.create({
      data: {
        userId: user.id!,
        title: "untitled",
        parentDocumentId,
      },
    });

    const url = `${base_url}/preview/${res.id}?isPublished=${res.isPublished}`;

    await db.document.update({
      where: {
        id: res.id,
      },
      data: {
        url,
      },
    });

    return { success: "Document created" };
  } catch (error) {
    console.log("DOCUMENT CREATE ERROR", error);
    return { error: "Error! something went's wrong, Tryagain!" };
  }
};

export const handleFavorite = async (docId: string) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!session || !user) return { error: "Unauthorized!" };
    if (!docId) return { error: "Document missing!" };

    const existingDocument = await getDocumentById(docId);

    if (!existingDocument) return { error: "No such document" };

    if (existingDocument.isFavorite) {
      await db.document.update({
        where: {
          id: existingDocument.id,
        },
        data: {
          isFavorite: false,
        },
      });

      return { success: "Removed from favorite Doc!" };
    }

    await db.document.update({
      where: {
        id: existingDocument.id,
      },
      data: {
        isFavorite: true,
      },
    });

    return { success: "Added to favorite Doc!" };
  } catch (error) {
    console.log("DOCUMENT ACTION ERROR", error);
    return { error: "Error! something went's wrong, Tryagain!" };
  }
};

export const handleRename = async (docId: string, title: string) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!session || !user) return { error: "Unauthorized!" };
    if (!docId) return { error: "Document missing!" };
    if (title.replaceAll(" ", "").length <= 0)
      return { error: "title atleast 1 character" };

    const existingDocument = await getDocumentById(docId);

    if (!existingDocument) return { error: "No such document" };

    await db.document.update({
      where: {
        id: existingDocument.id,
      },
      data: {
        title,
      },
    });

    return { success: `Doc renamed to ${title}` };
  } catch (error) {
    console.log("DOCUMENT ACTION ERROR", error);
    return { error: "Error! something went's wrong, Tryagain!" };
  }
};

export const handleDocumentAction = async (
  action: "archive" | "delete" | "restore",
  docId: string
) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!session || !user) return { error: "Unauthorized!" };
    if (!docId) return { error: "Document missing!" };

    const actionFunction =
      action === "archive"
        ? archiveDocument
        : action == "delete"
        ? deleteDocument
        : restorDocument;
        console.log(actionFunction);
        
    await processDocumentAndChildren(db, docId, actionFunction);

    return {
      success: `Document ${
        action.charAt(0).toUpperCase() + action.slice(1)
      }d Successfully`,
    };
  } catch (error) {
    console.log("DOCUMENT ACTION ERROR", error);
    return { error: "Error! something went's wrong, Tryagain!" };
  }
};
