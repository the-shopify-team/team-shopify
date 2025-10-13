import { TEAM_SHOPIFY_BASE_URL } from "@/lib/constants";
import { apiHelper } from "../helper";
import { CreateUserPayload, LoginPayload, LoginResponse } from '@/types/auth';


const createUserWithEmailUrl = `${TEAM_SHOPIFY_BASE_URL}/auth/users/`;
const loginWithEmailUrl = `${TEAM_SHOPIFY_BASE_URL}/auth/jwt/create/`;

export async function createUserWithEmail (data: CreateUserPayload ){
    return apiHelper(createUserWithEmailUrl, {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export async function loginWithEmail (data: LoginPayload) {
    return apiHelper<LoginResponse>(loginWithEmailUrl, {
        method: "POST",
        body: JSON.stringify(data)
    })
}