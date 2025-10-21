export type CreateUserPayload = {
  username?: string;
  email: string;
  password: string;
  phone?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
};

export type userProfileResponse = {
  id: number;
  username: string;
  email: string | null;
  phone: string | null;
  admin: boolean;
};
