"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import SideBar from "./(routes)/getting-start/components/SideBar";

const Main = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  /* if(!isAuthenticated){
        return redirect('/')
    } */

  return (
    <>
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-spinner loading-md text-gray-500"></div>
      )}
      {isAuthenticated && !isLoading && (
        <div className="flex h-full">
          <SideBar />
          <main className="flex-1 h-full">{children}</main>
        </div>
      )}
    </>
  );
};

export default Main;
