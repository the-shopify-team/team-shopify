"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-8xl  mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center">
          <h1 className="text-[32px] font-bold">
            <span className="text-[#FF9F1C]">Ride</span>hiv
          </h1>
        </Link>

        {/* Desktop Nav Links */}
        <div className="flex-1 justify-center items-center px-10 gap-12 hidden md:flex">
          <Link
            href="/"
            className="text-base font-medium transition-colors text-[#FF9F1C]"
          >
            Browse Cars
          </Link>
          <Link
            href="/"
            className="text-base font-medium transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/"
            className="text-base font-medium transition-colors"
          >
            Features
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="justify-center items-center gap-4 hidden md:flex">
          <button
            type="button"
            className="text-primary-blue rounded-xl border border-[#001933] bg-white min-w-[119px] px-4 py-2 hover:bg-[#FF9F1C] hover:border-none hover:text-white transition"
          >
            Log in
          </button>
          <button
            type="button"
            className="text-primary-blue rounded-xl border bg-[#FF9F1C] text-white min-w-[119px] px-4 py-2 hover:bg-white hover:border hover:border-[#001933] hover:text-[#1B1B1B] transition"
          >
            Sign up
          </button>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden flex items-center text-3xl text-[#FF9F1C] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <Menu /> : <X />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg z-20 px-6 py-4">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-base font-medium transition-colors text-[#FF9F1C]"
              onClick={() => setMenuOpen(false)}
            >
              Browse Cars
            </Link>
            <Link
              href="/"
              className="text-base font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="/"
              className="text-base font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </Link>
            <button
              type="button"
              className="text-primary-blue rounded-xl border border-[#001933] bg-white min-w-[119px] px-4 py-2 hover:bg-[#FF9F1C] hover:border-none hover:text-white transition"
            >
              Log in
            </button>
            <button
              type="button"
              className="text-primary-blue rounded-xl border bg-[#FF9F1C] text-white min-w-[119px] px-4 py-2 hover:bg-white hover:border hover:border-[#001933] hover:text-[#1B1B1B] transition"
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
