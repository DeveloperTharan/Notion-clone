"use client";

import React, { useTransition } from "react";
import Image from "next/image";

import { SignInWithGithub, SignInWithGoogle } from "@/actions/sign-in";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
} from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { SlSocialGoogle } from "react-icons/sl";

export const AuthModel = ({ children }: { children: React.ReactNode }) => {
  const [isPendingGithub, startTransitionGithub] = useTransition();
  const [isPendingGoogle, startTransitionGoogle] = useTransition();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center text-center h-auto gap-2">
            <Image src={"/logo.png"} alt="logo" width={40} height={40} />
            <span className="text-neutral-600 text-sm">Welcome to Notion!</span>
          </DialogTitle>
          <DialogDescription className="flex gap-3 p-5">
            <Button
              className="w-full flex gap-x-4"
              variant={"default"}
              onClick={() =>
                startTransitionGithub(() => {
                  SignInWithGithub();
                })
              }
              disabled={isPendingGithub}
            >
              {isPendingGithub ? (
                <Spinner size={"lg"} />
              ) : (
                <>
                  <FiGithub />
                  GitHub
                </>
              )}
            </Button>
            <Button
              className="w-full flex gap-x-4"
              variant={"default"}
              onClick={() =>
                startTransitionGoogle(() => {
                  SignInWithGoogle();
                })
              }
              disabled={isPendingGoogle}
            >
              {isPendingGoogle ? (
                <Spinner size={"lg"} />
              ) : (
                <>
                  <SlSocialGoogle />
                  Google
                </>
              )}
            </Button>
          </DialogDescription>
          <div className="flex gap-4 mt-4 items-center justify-center">
            <IoLogoInstagram className="text-[22px] text-gray-500 hover:text-pink-700 cursor-pointer" />
            <IoLogoTwitter className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
            <FaLinkedinIn className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
            <IoLogoFacebook className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
            <IoLogoYoutube className="text-[22px] text-gray-500 hover:text-red-600 cursor-pointer" />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
