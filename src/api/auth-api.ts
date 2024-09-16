import { instance } from './api.ts'
import { ResponseType, resultCodeEnum, resultCodeWithCaptchaEnum } from './api'


type meResponseDataType = {
    id: number
    email: string
    login: string
}
type loginResponseDataType = {
    userId: number
}


export const authAPI = {
    async me() {
        return instance.get<ResponseType<meResponseDataType>>(`https://social-network.samuraijs.com/api/1.0/auth/me`).then(res => res.data)
    },
    async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<loginResponseDataType, resultCodeEnum | resultCodeWithCaptchaEnum>>(`https://social-network.samuraijs.com/api/1.0/auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/auth/login`)
    },
}