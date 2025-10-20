"use client";

import Notification from "@/components/svgs/notification";
import { toast } from "sonner";
import { DashboardWrapperProps } from "@/types/dashboard";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DashboardWrapper = ({ children, role }: DashboardWrapperProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.replace("/login");
    toast.success("Logout successful");
  };

  return (
    <div className="h-screen px-12 py-6 flex flex-col overflow-hidden">
      {/* top  */}
      <header className="flex justify-between items-center">
        {/* app name */}
        <div className="font-bold text-3xl uppercase">
          <span className="text-[#FF9F1C]">Ride</span>
          hive
        </div>

        {/* notification and profile */}
        <div className="flex items-center gap-3">
          {/* notification */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <Notification />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 hover:bg-gray-200 cursor-pointer"
            >
              <User className="h-5 w-5 text-gray-700" />
              <span className="text-sm text-gray-700 capitalize">{role}</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow-lg">
                <ul className="text-sm text-gray-700">
                  {/* Only show View Profile for users */}
                  {role === "user" && (
                    <li>
                      <button
                        onClick={() => router.push("/dashboard/user/profile")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        View Profile
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
};

export default DashboardWrapper;
