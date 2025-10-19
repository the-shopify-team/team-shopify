"use client";

import { getUserProfile } from "@/api/resource/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        const result = await getUserProfile();

        localStorage.setItem("username", result.username);

        if (result.admin) {
          router.replace("/dashboard/admin");
        } else {
          router.replace("/dashboard/user");
        }
      } catch (error) {
        console.error(error);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        router.replace("/login");
      }
    };

    redirectUser();
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-3 bg-[#FFFDF8]">
      <Loader2 className="h-6 w-6 animate-spin text-[#FF9F1C]" />
      <p className="text-gray-600 text-sm">Loading your dashboard...</p>
    </div>
  );
}
