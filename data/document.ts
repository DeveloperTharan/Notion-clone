import { db } from "@/lib/db";

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
