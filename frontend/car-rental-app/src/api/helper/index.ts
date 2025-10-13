import { extractErrorMessage } from "@/lib/utils";
import { toast } from "sonner"

export async function apiHelper<T>(
    url: string, 
    config: RequestInit = {}
): Promise<T>{
    const token = 
      typeof window !== "undefined"
       ? localStorage.getItem("access_token") 
       : null;

    const res = await fetch(url, {
      ...config,
      method: config.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(config.headers || {}),
    },
    })

    // Handle error
    if (!res.ok) {
    let message = "Request failed";
    try {
      const data = await res.json();
      message = extractErrorMessage(data);
    } catch {
      // response might be empty or not JSON
    }

    toast.error(message);
    throw new Error(message);
    }

    // Handle cases where response body is empty
    const text = await res.text();
    return text ? JSON.parse(text) : ({} as T);
}