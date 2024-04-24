"use server";

import { signIn } from "@/auth";

export const SignInWithGithub = async () => {
  await signIn("github", { redirectTo: "/workspace" });
};

export const SignInWithGoogle = async () => {
  await signIn("google", { redirectTo: "/workspace" });
};
