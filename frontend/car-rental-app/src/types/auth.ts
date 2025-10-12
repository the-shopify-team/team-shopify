export type CreateUserPayload = {
  username?: string;
  email: string;
  password: string;
  phone?: string;
};

export type CreateUserResponse = {
  id: number
  username?: string | null;
  email: string;
  phone?: string | null;
};