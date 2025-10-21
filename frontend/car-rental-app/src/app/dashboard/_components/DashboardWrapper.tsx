"use client";

import Notification from "@/components/svgs/notification";
import { toast } from "sonner";
import { DashboardWrapperProps } from "@/types/dashboard";
// import { User } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

const DashboardWrapper = ({ children, role }: DashboardWrapperProps) => {
  const router = useRouter();
  // const [open, setOpen] = useState(false);

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
          <ProfileMenu
            role={role}
            onLogout={handleLogout}
          />
        </div>
      </header>
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
};

export default DashboardWrapper;
