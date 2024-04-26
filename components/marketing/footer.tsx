import React from "react";
import Link from "next/link";
import Image from "next/image";

import { FaLinkedinIn } from "react-icons/fa";
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoFacebook,
} from "react-icons/io";

export const Footer = () => {
  return (
    <div className="flex flex-row items-center justify-between px-8 py-4 border-t">
      <Link href={"/"} className="flex items-center justify-center gap-x-2">
        <Image src={"/logo.png"} alt="logo" width={40} height={40} />
        <span className="text-lg font-semibold">Notion</span>
      </Link>
      <div className="flex gap-4 mt-4">
        <IoLogoInstagram className="text-[22px] text-gray-500 hover:text-pink-700 cursor-pointer" />
        <IoLogoTwitter className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
        <FaLinkedinIn className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
        <IoLogoFacebook className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
        <IoLogoYoutube className="text-[22px] text-gray-500 hover:text-red-600 cursor-pointer" />
      </div>
    </div>
  );
};
