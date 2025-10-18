"use client";

import { useEffect, useState } from "react";
import AddCarModal from "../_components/AddCarModal";

export default function AdminPage() {
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        const getUsername = localStorage.getItem("username")
        setUsername(getUsername)
    }, [])

  return (
    <div>
        {/* top */}
        <div className="flex justify-between items-center py-6">
            <div>
                <h2 className="font-medium text-2xl mb-1.5">Welcome Back, {username ? username : "Ridehive"}!</h2>
                <p className="text-base font-normal">Your Ridehive car dashboard</p>
            </div>
            <AddCarModal/>
        </div>
    </div>
  );
}
