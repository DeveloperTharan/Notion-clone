import React, { useState } from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { IoSearchSharp } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function SearchModel({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);

  const handleSelect = (id: string) => {
    router.push(`/getting-start/${id}`);
    handleOpen();
  };

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <button onClick={handleOpen} className="w-full">
        {children}
      </button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleOpen}
        >
          ✕
        </button>
        <DialogHeader>
          <div className="flex items-center gap-x-1 p-2 w-full border-b-[1px] border-b-gray-300">
            <IoSearchSharp className="h-4 w-4 shrink-0 text-gray-600" />
            <input
              className="h-7 px-2 focus-visible:ring-transparent outline-none w-full text-[16px] font-thin"
              placeholder={`Search ${user?.fullName}'s Notion...`}
            />
          </div>
        </DialogHeader>
        <DialogBody>
          <p className="hidden last:block text-sm text-center text- pb-2">
            No results found.
          </p>
          {documents?.map((document) => (
            <div
              key={document._id}
              title={document.title}
              onClick={() => handleSelect(document._id)}
              className="flex gap-x-2 items-center justify-start cursor-pointer hover:bg-gray-200 
              w-full px-4 rounded-md py-1 mt-2"
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <IoDocumentTextOutline className="h-4 w-4" />
              )}
              <h5>{document.title}</h5>
            </div>
          ))}
        </DialogBody>
      </Dialog>
    </>
  );
}