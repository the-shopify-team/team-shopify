"use client";

import { useEffect, useState } from "react";
import { Dashboard } from "../_components";
import  Cars  from "@/components/Cars";


export default function UserPage() {
  const [username, setUsername] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const getUsername = localStorage.getItem("username");
    setUsername(getUsername);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "cars":
        return <Cars />;
      default:
        return <Dashboard />;
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "cars", label: "Cars" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* top */}
      <div className="flex justify-between items-center pt-10 pb-12">
        <div>
          <h2 className="font-medium text-2xl mb-1.5">
            Welcome Back, {username ? username : "Ridehive"}!
          </h2>
          <p className="text-base font-normal">Your Ridehive car dashboard</p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex flex-wrap gap-y-2 bg-[#EDF2F7] py-2.5 px-1.5 rounded-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-20 py-2 rounded-full transition flex-1 text-sm ${
              activeTab === tab.id ? "bg-white text-[#011628]" : "text-[#121416]"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render active tab content */}
      <div className="flex-1 overflow-y-auto mt-6">{renderTabContent()}</div>
    </div>
  );
}
