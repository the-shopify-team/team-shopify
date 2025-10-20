"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import SearchManufacturer from "./SearchManufacturer";
import { CarFront, Search } from "lucide-react";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button
    type="submit"
    className={`-ml-3 z-10 ${otherClasses}`}
  >
    <Search />
  </button>
);

const SearchBar = () => {
  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer.trim() === "" && model.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-center max-sm:flex-col w-full relative max-sm:gap-4 max-w-3xl gap-10 mx-auto"
    >
      <div className="flex-1 max-sm:w-full flex justify-center items-center relative">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManuFacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="flex-1 max-sm:w-full flex justify-center items-center relative">
        <div className="absolute left-3 z-10 text-gray-500">
          <CarFront />
        </div>
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="model..."
          className="w-full h-[48px] pl-12 p-4 border-b-2 outline-none cursor-pointer text-sm"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
