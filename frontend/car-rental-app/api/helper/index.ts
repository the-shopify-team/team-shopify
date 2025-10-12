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
      method: config.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(config.headers || {}),
    },
    ...config
    })

    // Handle error
    if (!res.ok) {
      let message = "Request failed";
      try {
        const data = await res.json();
        message = data.detail || data.message || message;
      } catch (_) {
      // when response body is empty
      }
    
      toast.error(message);

      return Promise.reject(new Error(message));
    }

    // Handle cases where response body is empty
    const text = await res.text();
    return text ? (JSON.parse(text) as T) : ({} as T);
}