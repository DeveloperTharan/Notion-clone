import { UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { CiCirclePlus, CiClock2, CiSettings, CiSearch } from "react-icons/ci";
import { PiArrowsClockwiseThin } from "react-icons/pi";
import Item from "./Item";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function sideBar() {
  const [open, setOpen] = useState(true);
  const { user } = useUser();
  const documents = useQuery(api.documents.get);
  const create = useMutation(api.documents.create);

  const handelCreate = () => {
    const promise = create({ title: "untitled" });

    toast.promise(promise, {
      loading: "Creating a new Note...",
      success: "New note created.",
      error: "Failed to create a new note.",
      duration: 1000,
    });
  };

  const descriptionhandeler = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <div className="bg-gray-50 border-r-[1px] border-base-200 relative h-full">
      <div
        className={`bg-dark-purple h-screen p-1 pt-3 relative duration-300 
        ${open ? "w-56" : "w-16"} 
        ${open && "transition-all ease-in-out duration-700"} 
        ${!open && "transition-all ease-in-out duration-700"}`}
      >
        <RxDoubleArrowLeft
          className={`absolute cursor-pointer -right-4 top-[30px] w-7 border-gray-50
          border-2 rounded-full bg-base-100 hover:bg-base-300 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center justify-center hover:bg-base-200 mt-1 py-1 rounded-md gap-2">
          <div
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          >
            <UserButton afterSignOutUrl="/" />
          </div>
          <span className={`cursor-pointer text-sm ${!open && "hidden"}`}>
            {descriptionhandeler(`${user?.fullName}`, 13)}
          </span>
          <PiArrowsClockwiseThin
            className={`cursor-pointer text-sm ${!open && "hidden"}`}
          />
        </div>
        <div className="mt-2">
          <Item
            label="Search"
            isSearch
            onClick={() => {}}
            open={open}
            icon={CiSearch}
          />
          <Item label="Updates" open={open} icon={CiClock2} />
          <Item label="Settings" open={open} icon={CiSettings} />
          <Item
            onClick={handelCreate}
            label="New Page"
            open={open}
            icon={CiCirclePlus}
          />
        </div>
        <div className="mt-2">
          {documents?.map((document) => (
            <p>{document.title}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
