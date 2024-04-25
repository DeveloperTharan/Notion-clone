"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const createDocument = async (parentId?: string) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!session || !user) return { error: "Unauthorized!" };

    const parentDocumentId = parentId ?? parentId;

    await db.document.create({
      data: {
        userId: user.id!,
        title: "untitled",
        parentDocumentId,
      },
    });

    return { success: "Document created" };
  } catch (error) {
    console.log("DOCUMENT CREATE ERROR", error);
    return { error: "Error! something went's wrong, Tryagain!" };
  }
};
