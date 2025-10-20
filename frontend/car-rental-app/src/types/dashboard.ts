export type DashboardWrapperProps = {
  children: React.ReactNode;
  role: "admin" | "user";
};

export type CarPayload = {
  make: string;
  model: string;
  price: string;
  images_url: string;
  available: boolean;
  //   color?: string;
  //   fuel_type?: string;
  //   transmission?: string;
  //   description?: string;
};

export type CarResponse = {
  id: number;
  make: string;
  model: string;
  year?: string;
  price: string;
  images_url: File | string;
  available: boolean;
  color: string;
  fuel_type: string;
  transmission: string;
  license_plate?: string;
  category: string;
  description: string;
  added_at?: string;
};

export type DeleteCarResponse = {
  message: string;
};

export type BookingResponse = {
  id: number;
  username: string;
  email: string;
  car: string;
  startDate: string;
  endDate: string;
  status: string;
  price: number;
};

export type AdminCreateReservationPayload = {
  email: string;
  username?: string;
  car: string;
  status: "soft" | "firm" | "expired" | "completed" | "deleted";
  startDate: string;
  endDate: string;
}

export type adminGetReservationResponse = {
  id: number;
  username: string;
  email: string;
  car: string;
  startDate: string;
  endDate: string;
  status: string;
  price: number;
}

export type adminDeletesReservationResponse = {
  message: string;
}