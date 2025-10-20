import { TEAM_SHOPIFY_BASE_URL } from "@/lib/constants";
import { apiHelper } from "../helper";
import { CarResponse, DeleteCarResponse, AdminCreateReservationPayload, adminGetReservationResponse, adminDeletesReservationResponse } from "@/types/dashboard";

export const addCarUrl = `${TEAM_SHOPIFY_BASE_URL}/car/add`;
export const editCarUrl = `${TEAM_SHOPIFY_BASE_URL}/car/update`;

const getCarUrl = `${TEAM_SHOPIFY_BASE_URL}/car/all`;
const deleteCarUrl = (id: number) => `${TEAM_SHOPIFY_BASE_URL}/car/update/${id}`;
const adminCreateReservationUrl = `${TEAM_SHOPIFY_BASE_URL}/reservation/admin/`;
const adminGetReservationUrl = `${TEAM_SHOPIFY_BASE_URL}/reservation/admin/`;
const adminGetReservationByIdUrl = (id: number) => `${TEAM_SHOPIFY_BASE_URL}/reservation/admin/${id}`;
const adminEditReservationUrl = (id: number) => `${TEAM_SHOPIFY_BASE_URL}/reservation/admin/${id}`;
const adminDeletesReservationUrl = (id: number) => `${TEAM_SHOPIFY_BASE_URL}/reservation/admin/${id}`;

export async function getCar() {
  return apiHelper<CarResponse[]>(getCarUrl);
}

export async function deleteCar(id: number) {
  return apiHelper<DeleteCarResponse>(`${deleteCarUrl(id)}`, {
    method: "DELETE",
  });
}

export async function adminCreateReservation(data: AdminCreateReservationPayload) {
  return apiHelper(adminCreateReservationUrl, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function adminGetReservation() {
  return apiHelper<adminGetReservationResponse[]>(adminGetReservationUrl);
}

export async function adminEditReservation(id: number, data: AdminCreateReservationPayload) {
  return apiHelper(`${adminEditReservationUrl(id)}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function adminDeletesReservation(id: number) {
  return apiHelper<adminDeletesReservationResponse>(`${adminDeletesReservationUrl(id)}`, {
    method: "DELETE",
  });
}
