import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";

export const getDocumentById = async (id: string) => {
  try {
    if (!id) return null;

    const res = await db.document.findUnique({
      where: {
        id,
      },
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const archiveDocument = async (db: PrismaClient, id: string) => {
  await db.document.update({
    where: {
      id: id,
    },
    data: {
      isArchived: true,
    },
  });
};

export const restorDocument = async (db: PrismaClient, id: string) => {
  await db.document.update({
    where: {
      id,
    },
    data: {
      isArchived: false,
    },
  });
};

export const deleteDocument = async (db: PrismaClient, id: string) => {
  await db.document.delete({
    where: {
      id: id,
    },
  });
};
