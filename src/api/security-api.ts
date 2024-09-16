import {instance} from './api.ts'

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    async getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`https://social-network.samuraijs.com/api/1.0/security/get-captcha-url`)
        .then(res => res.data)
    },

}

//50:00 закончил типизировать api