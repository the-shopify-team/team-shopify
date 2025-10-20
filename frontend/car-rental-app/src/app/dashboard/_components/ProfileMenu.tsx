"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "lucide-react";

type ProfileMenuProps = {
  role?: string;
  className?: string;
  onLogout?: () => void;
};

const ProfileMenu = ({ role = "user", className = "", onLogout }: ProfileMenuProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleViewProfile = () => {
    setOpen(false);
    router.push("/dashboard/user/profile");
  };

  const handleSettings = () => {
    setOpen(false);
    router.push("/dashboard/settings");
  };

  const handleLogout = () => {
    setOpen(false);
    if (onLogout) {
      onLogout();
      return;
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("Logout successful");
    router.replace("/login");
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 hover:bg-gray-200 cursor-pointer"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <User className="h-5 w-5 text-gray-700" />
        <span className="text-sm text-gray-700 capitalize">{role}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow-lg z-40">
          <ul className="text-sm text-gray-700">
            {role === "user" && (
              <li>
                <button
                  onClick={handleViewProfile}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  View Profile
                </button>
              </li>
            )}

            <li>
              <button
                onClick={handleSettings}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Settings
              </button>
            </li>

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
  );
};

export default ProfileMenu;