"use client";

import CreateBookingModal from "./CreateBookingModal";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { useState } from "react";
import { BookingResponse } from "@/types/dashboard";

const mockBookings = [
  {
    id: 1,
    username: "John Doe",
    email: "john@example.com",
    car: "2021 Tesla Model S",
    startDate: "2025-11-01T00:00:00Z",
    endDate: "2025-11-05T00:00:00Z",
    status: "soft",
    price: 1200,
  },
  {
    id: 2,
    username: "Jane Smith",
    email: "jane@example.com",
    car: "2023 BMW X5",
    startDate: "2025-10-25T00:00:00Z",
    endDate: "2025-10-30T00:00:00Z",
    status: "soft",
    price: 950,
  },
  {
    id: 3,
    username: "Bob Johnson",
    email: "bob@example.com",
    car: "2022 Audi A4",
    startDate: "2025-12-01T00:00:00Z",
    endDate: "2025-12-10T00:00:00Z",
    status: "firm",
    price: 1500,
  },
  {
    id: 4,
    username: "Alice Williams",
    email: "alice@example.com",
    car: "2020 Mercedes-Benz C-Class",
    startDate: "2025-12-15T00:00:00Z",
    endDate: "2025-12-20T00:00:00Z",
    status: "firm",
    price: 1500,
  },
  {
    id: 5,
    username: "Alice Williams",
    email: "alice@example.com",
    car: "2020 Mercedes-Benz C-Class",
    startDate: "2025-12-15T00:00:00Z",
    endDate: "2025-12-20T00:00:00Z",
    status: "expired",
    price: 1500,
  },
  {
    id: 6,
    username: "Alice Williams",
    email: "alice@example.com",
    car: "2020 Mercedes-Benz C-Class",
    startDate: "2025-12-15T00:00:00Z",
    endDate: "2025-12-20T00:00:00Z",
    status: "deleted",
    price: 1500,
  },
  {
    id: 7,
    username: "Alice Williams",
    email: "alice@example.com",
    car: "2020 Mercedes-Benz C-Class",
    startDate: "2025-12-15T00:00:00Z",
    endDate: "2025-12-20T00:00:00Z",
    status: "complete",
    price: 1500,
  },
  {
    id: 8,
    username: "Alice Williams",
    email: "alice@example.com",
    car: "2020 Mercedes-Benz C-Class",
    startDate: "2025-12-15T00:00:00Z",
    endDate: "2025-12-20T00:00:00Z",
    status: "firm",
    price: 1500,
  },
  {
    id: 9,
    username: "mimi mimi",
    email: "alice@example.com",
    car: "2020 Mercedes-Benz C-Class",
    startDate: "2025-12-15T00:00:00Z",
    endDate: "2025-12-20T00:00:00Z",
    status: "firm",
    price: 1500,
  },
];

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<BookingResponse | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<BookingResponse | null>(null);

  // if (loading)
  //     return <p className="text-center py-10 text-muted-foreground text-lg">Loading bookings...</p>;

  return (
    <div className="px-7">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-10">Manage Bookings</h2>
        <CreateBookingModal />
      </div>
      <DataTable
        columns={columns}
        data={mockBookings}
      />
    </div>
  );
};

export default Bookings;
