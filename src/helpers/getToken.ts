'use server'
import { cookies } from "next/headers"

export const getToken = async ()=>{
    const cookiesStore = await cookies()
    const token = cookiesStore.get('sabz-token')?.value
    return token
}