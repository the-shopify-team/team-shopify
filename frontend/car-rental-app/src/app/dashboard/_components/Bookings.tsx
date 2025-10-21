"use client";

import CreateBookingModal from "./CreateBookingModal";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { useEffect, useState } from "react";
import { adminGetReservationResponse } from "@/types/dashboard";
import { adminGetReservation } from "@/api/resource/dashboard";
import { toast } from "sonner";

const Bookings = () => {
  const [bookings, setBookings] = useState<adminGetReservationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  // const [selectedBooking, setSelectedBooking] = useState<adminGetReservationResponse | null>(null);
  // const [detailsOpen, setDetailsOpen] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [editingBooking, setEditingBooking] = useState<adminGetReservationResponse | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await adminGetReservation();
        setBookings(data);
      } catch {
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return <p className="text-center py-10 text-muted-foreground text-lg">Loading bookings...</p>;

  return (
    <div className="px-7">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-10">Manage Bookings</h2>
        <CreateBookingModal />
      </div>
      <DataTable
        columns={columns}
        data={bookings}
      />
    </div>
  );
};

export default Bookings;
