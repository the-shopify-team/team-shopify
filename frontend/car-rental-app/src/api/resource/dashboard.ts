import { TEAM_SHOPIFY_BASE_URL } from "@/lib/constants";
import { apiHelper } from "../helper";
import { CarResponse, DeleteCarResponse, ReserveCarResponse } from "@/types/dashboard";

export const addCarUrl = `${TEAM_SHOPIFY_BASE_URL}/car/add`;
export const editCarUrl = `${TEAM_SHOPIFY_BASE_URL}/car/update`;

const getCarUrl = `${TEAM_SHOPIFY_BASE_URL}/car/all`;
const reserveCarUrl = (id: number) =>  `${TEAM_SHOPIFY_BASE_URL}/reservation/${id}`;
const deleteCarUrl = (id: number) => `${TEAM_SHOPIFY_BASE_URL}/car/update/${id}`;

export async function getCar() {
  return apiHelper<CarResponse[]>(getCarUrl);
}

export async function reserveCar(id: number) {
  return apiHelper<ReserveCarResponse>(`${reserveCarUrl(id)}`, {
    method: "POST",
  });
}

export async function deleteCar(id: number) {
  return apiHelper<DeleteCarResponse>(`${deleteCarUrl(id)}`, {
    method: "DELETE",
  });
}
