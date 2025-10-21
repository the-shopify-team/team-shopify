import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractErrorMessage(data: unknown): string {
  if (!data || typeof data !== "object") return "Request failed";

  const obj = data as Record<string, unknown>;

  const detail = obj["detail"];
  if (typeof detail === "string") return detail;

  const message = obj["message"];
  if (typeof message === "string") return message;

  const keys = Object.keys(obj);
  if (keys.length > 0) {
    const val = obj[keys[0]];
    if (Array.isArray(val) && typeof val[0] === "string") return val[0];
    if (typeof val === "string") return val;
  }

  return "Request failed";
}
