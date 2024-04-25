import { PrismaClient } from "@prisma/client";

export const processDocumentAndChildren = async (
  db: PrismaClient,
  parentId: string,
  action: (db: PrismaClient, id: string) => Promise<void>
) => {
  const children = await db.document.findMany({
    where: {
      parentDocumentId: parentId,
    },
  });

  for (const child of children) {
    await processDocumentAndChildren(db, child.id, action);
  }

  await action(db, parentId);
};