import { UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { RxDoubleArrowLeft} from "react-icons/rx";
import { PiArrowsClockwiseThin } from "react-icons/pi";

export default function sideBar() {
  const [open, setOpen] = useState(true);

  const { user } = useUser();

  const descriptionhandeler = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <div className="bg-gray-50 border-r-[1px] border-base-200 relative h-full">
      <div
        className={`bg-dark-purple h-screen p-1 pt-3 relative duration-300 ${open ? "w-56" : "w-16"}`}
      >
        <RxDoubleArrowLeft
          className={`absolute cursor-pointer -right-3 top-7 w-7 border-dark-purple
          border-2 rounded-full hover:bg-base-300 ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center px-2 hover:bg-base-200 mt-1 py-1 rounded-md gap-2">
          <div className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}>
            <UserButton afterSignOutUrl='/' />
          </div>
          <span className={`cursor-pointer text-sm ${!open && "hidden"}`}>{descriptionhandeler(`${user?.fullName}`, 13)}</span>
          <PiArrowsClockwiseThin className={`cursor-pointer text-sm ${!open && "hidden"}`} />
        </div>
        <div className="">
          
        </div>
      </div>
    </div>
  );
};