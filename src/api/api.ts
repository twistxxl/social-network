import axios, { AxiosResponse } from "axios";
import {userType} from '../types/types.ts'

export const instance = axios.create({
    withCredentials: true,
    headers: { 'API-KEY': "aff6b558-6641-499c-9426-43166041ced1" }
})


export enum resultCodeEnum {
    Succes = 0,
    Error= 1,
    CaptchaIsRecuired = 10
}
export enum resultCodeWithCaptchaEnum {
    CaptchaIsRecuired = 10
}

export type GetUsersItems = {
    items: Array<userType>
    totalCount: number
    error: string | null
}

//generic type
export type ResponseType<D = {}, RC = resultCodeEnum,> = {
    data: D
    messages: Array<string>
    resultCode: RC
}






