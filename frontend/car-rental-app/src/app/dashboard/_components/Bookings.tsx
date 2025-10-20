"use client";

import CreateBookingModal from "./CreateBookingModal";

const Bookings = () => {
  return (
    <div className="px-7">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-10">Manage Bookings</h2>
        <CreateBookingModal />
      </div>
    </div>
  );
};

export default Bookings;
