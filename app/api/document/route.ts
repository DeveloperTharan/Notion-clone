import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    const user = session?.user;

    if (!session || !user) return { error: "Unauthorized!" };

    const res = await db.document.findMany({
      where: {
        isArchived: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log("INTERNAL SERVER ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
