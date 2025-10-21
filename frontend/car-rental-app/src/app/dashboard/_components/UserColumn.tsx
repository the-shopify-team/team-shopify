import { ColumnDef } from "@tanstack/react-table";
import { UserResponse } from "@/types/dashboard";

export const columns: ColumnDef<UserResponse>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
