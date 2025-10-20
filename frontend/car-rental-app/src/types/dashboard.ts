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

export type ReserveCarResponse = {
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
  user?: string;
  car: number;
  status: "soft" | "firm" | "expired" | "completed" | "deleted";
  start_date: string;
  end_date: string;
  username?: string;
};

export type adminGetReservationResponse = {
  id: number;
  user: number;
  car: number;
  username: string;
  email: string;
  car_name: string;
  start_date: string;
  end_date: string;
  status: string;
  price: number;
  date_reserved: string;
  expiry_date: string;
};

export type adminDeletesReservationResponse = {
  message: string;
};

export type UserResponse = {
  id: number;
  username: string;
  email: string;
};
