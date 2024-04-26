import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { db } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signOut: "/",
    error: "/error",
  },
  adapter: PrismaAdapter(db),
  providers: [GitHub, Google],
});
