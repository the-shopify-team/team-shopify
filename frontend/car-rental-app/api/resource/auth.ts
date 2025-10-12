import { TEAM_SHOPIFY_BASE_URL } from "@/lib/constants";
import { apiHelper } from "../helper";
import { CreateUserPayload } from '@/types/auth';


const createUserWithEmailUrl = `${TEAM_SHOPIFY_BASE_URL}/auth/users`

export async function CreateUser (data: CreateUserPayload ){
    return apiHelper(createUserWithEmailUrl, {
        method: "POST",
        body: JSON.stringify(data)
    })
}