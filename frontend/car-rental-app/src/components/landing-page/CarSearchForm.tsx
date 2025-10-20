"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CarSearchForm() {
  const [model, setModel] = useState("");

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-8xl mx-auto">
      {/* Grid Container */}
      <form className="gap-5">
        {/* Choose Car Type */}
        <div className="grid md:grid md:grid-cols-3 gap-5 mb-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Choose Car Type</label>
            <div className="relative">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2.5 px-4 appearance-none text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Model</option>
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="truck">Truck</option>
                <option value="van">Van</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Pick Up Location */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Pick Up Location</label>
            <input
              type="text"
              placeholder="Type..."
              className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Drop Off Location */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Drop Off Location</label>
            <input
              type="text"
              placeholder="Type..."
              className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Pick Up Date & Time */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {/* Pick Up Date & Time */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Pick Up Date & Time</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="relative flex-1">
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
          </div>

          {/* Return Date & Time */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Return Date & Time</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="relative flex-1">
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
          </div>

          {/* Add two more columns or placeholders if needed for grid-cols-4 */}
        </div>

        {/* Search Button */}
        <div className="flex items-end justify-center md:col-span-3">
          <button
            type="submit"
            className="bg-orange-400 text-white font-semibold rounded-lg py-3 px-10 mt-4 hover:bg-orange-500 transition-all"
          >
            Sreach
          </button>
        </div>
      </form>
    </div>
  );
}
