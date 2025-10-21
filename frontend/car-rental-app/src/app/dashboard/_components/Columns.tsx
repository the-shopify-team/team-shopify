import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { adminGetReservationResponse } from "@/types/dashboard";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const columns: ColumnDef<adminGetReservationResponse>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "car_name",
    header: "Car",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("start_date"));
      return format(date, "PPP");
    },
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("end_date"));
      return format(date, "PPP");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const bgColor =
        status === "soft"
          ? "bg-[#64D9FF]"
          : status === "firm"
            ? "bg-[#56F000]"
            : status === "expired"
              ? "bg-[#FF3838]"
              : status === "completed"
                ? "bg-[#56F000]"
                : status === "deleted"
                  ? "bg-[#FFB302]"
                  : "";

      return <Badge className={`${bgColor} text-white px-2.5 py-0.5 rounded`}>{status}</Badge>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className="w-full text-left px-2 py-1.5">View</DialogTrigger>
                <DialogContent className="max-w-sm p-6 rounded-lg shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Reservation Details</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-gray-600">
                    View reservation info for {booking.username}.
                  </p>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className="w-full text-left px-2 py-1.5">Edit</DialogTrigger>
                <DialogContent className="max-w-sm p-6 rounded-lg shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Edit Reservation</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-gray-600">Edit dates or car for {booking.username}.</p>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className="w-full text-left px-2 py-1.5">Cancel</DialogTrigger>
                <DialogContent className="max-w-sm p-6 rounded-lg shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                      Confirm Cancellation
                    </DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-gray-600">
                    Are you sure you want to cancel {booking.username}&apos;s reservation?
                  </p>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
