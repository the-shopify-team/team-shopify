"use client";

import ProfileMenu from "@/app/dashboard/_components/ProfileMenu";
import { Menu, X } from "lucide-react";
import { DashboardWrapperProps } from "@/types/dashboard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const NavBar = ({ role }: DashboardWrapperProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("Logout successful");
  };

  useEffect(() => {
    // check for token on client
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    setIsLoggedIn(Boolean(token));
  }, []);

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-8xl  mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center">
          <h1 className="text-[32px] font-bold uppercase">
            <span className="text-[#FF9F1C]">Ride</span>hive
          </h1>
        </Link>

        {/* Desktop Nav Links */}
        

        {/* Desktop Auth / Profile */}
        <div className="justify-center items-center gap-4 hidden md:flex">
          {!isLoggedIn ? (
            <>
              <Link href="/login">
                <button
                  type="button"
                  className="text-primary-blue rounded-xl border border-[#001933] bg-white min-w-[119px] px-4 py-2 hover:bg-[#FF9F1C] hover:border-none hover:text-white transition"
                >
                  Log in
                </button>
              </Link>
              <Link href="/signup">
                <button
                  type="button"
                  className="text-primary-blue rounded-xl border bg-[#FF9F1C] text-white min-w-[119px] px-4 py-2 hover:bg-white hover:border hover:border-[#001933] hover:text-[#1B1B1B] transition"
                >
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <ProfileMenu role={role} onLogout={handleLogout} />
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden flex items-center text-3xl text-[#FF9F1C] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg z-20 px-6 py-4">
          <div className="flex flex-col gap-4">
            <Link
              href="/login"
              className="text-primary-blue rounded-xl border border-[#001933] bg-white min-w-[119px] px-4 py-2 hover:bg-[#FF9F1C] hover:border-none hover:text-white transition"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-primary-blue rounded-xl border bg-[#FF9F1C] text-white min-w-[119px] px-4 py-2 hover:bg-white hover:border hover:border-[#001933] hover:text-[#1B1B1B] transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
