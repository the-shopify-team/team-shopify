"use client";

import { useEffect, useRef, useState } from "react";
import { brands } from "@/constants";
import { CarFront } from "lucide-react";

type Props = {
  manufacturer: string;
  setManufacturer: (value: string) => void;
};

const SearchManufacturer = ({ manufacturer, setManufacturer }: Props) => {
  const [query, setQuery] = useState(manufacturer || "");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keep input synced with selected manufacturer
  useEffect(() => {
    setQuery(manufacturer || "");
  }, [manufacturer]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter logic
  const filteredManufacturers =
    query.trim() === ""
      ? brands
      : brands.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  // Select a manufacturer
  const handleSelect = (value: string) => {
    setManufacturer(value);
    setQuery(value);
    setIsOpen(false);
  };

  // Handle creating a new manufacturer
  const handleCreate = () => {
    if (query.trim() === "") return;
    setManufacturer(query.trim());
    setIsOpen(false);
  };

  return (
    <div
      className="flex-1 max-sm:w-full flex justify-start items-start relative w-full"
      ref={containerRef}
    >
      <div className="relative w-full">
        {/* Car logo button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute top-[12px] left-3 text-gray-500"
        >
          <CarFront />
        </button>

        {/* Input field */}
        <input
          aria-label="Search manufacturer"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Select brand..."
          className="w-full h-[48px] pl-12 p-4 border-b-2 bg-light-white outline-none cursor-pointer text-sm pr-3 py-2 text-gray-700 focus:outline-none focus:ring-0"
        />

        {/* Dropdown options */}
        {isOpen && (
          <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-0 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredManufacturers.length === 0 && query.trim() !== "" ? (
              <li
                onClick={handleCreate}
                className="px-4 py-2 cursor-pointer hover:bg-primary-blue hover:text-white"
              >
                Create “{query}”
              </li>
            ) : (
              filteredManufacturers.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(item.name)}
                  className={`px-4 py-2 cursor-pointer hover:bg-primary-blue hover:text-[#FF9F1C] ${
                    item.name === manufacturer ? "font-medium" : "font-normal"
                  }`}
                >
                  {item.name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchManufacturer;
