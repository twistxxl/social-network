import { stopSubmit } from "redux-form";
import { resultCodeEnum, resultCodeWithCaptchaEnum } from "../api/api.ts";
import { authAPI } from "../api/auth-api.ts";
import { securityAPI } from "../api/security-api.ts";




let SET_USER_DATA = "auth/SET_USER_DATA"
let GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS"



export type initialStateType = {
    userId: null | number,
    email: null | string,
    login: null | string,
    isAuth: boolean ,
    captchaUrl: null | string
}


let initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action: any): initialStateType => {

    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,

            }
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }

        default:
            return state
    }


}
type setAuthUserDataActionDataType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    data: setAuthUserDataActionDataType
}


export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => {
    return {
        type: SET_USER_DATA,
        data: { userId, email, login, isAuth }
    }
}

type getCaptchaUrlSuccessAvtionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}

} 

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessAvtionType => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload : {captchaUrl}
    }
}

//thunk down
export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me()
    if (response.resultCode === resultCodeEnum.Succes) {
        let { id, email, login } = response.data
        //НЕ ЗАБЫВАТЬ ДИСПАТЧИТЬ СЕТЫ
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
            if (response.resultCode === resultCodeEnum.Succes) {
                dispatch(getAuthUserData())
            } else {
                if (response.resultCode === resultCodeWithCaptchaEnum.CaptchaIsRecuired) {
                    dispatch(setCaptchaUrl())
                }
                let message = response.messages.length > 0 ? response.messages[0] : "Some error"
                dispatch(stopSubmit('login', { email: message }))
            }
}
export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()
            if (response.data.resultCode === resultCodeEnum.Succes) {
                dispatch(getAuthUserData())
            }
}



export const setCaptchaUrl = () => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}




export default authReducer