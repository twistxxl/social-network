import { stopSubmit } from "redux-form";
import { resultCodeEnum, resultCodeWithCaptchaEnum } from "../api/api.ts";
import { authAPI } from "../api/auth-api.ts";
import { securityAPI } from "../api/security-api.ts";
import { BaseThunkType } from "./reduxStore.ts";
import { inferActionsTypes } from "./reduxStore.ts";
import { FormAction } from "redux-form"



let SET_USER_DATA = "auth/SET_USER_DATA"
let GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS"



export type initialStateType = typeof initialState
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}
type ActionsTypes = inferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {

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


//this deleted

// type setAuthUserDataActionDataType = {
//     userId: number | null
//     email: string | null
//     login: string | null
//     isAuth: boolean
// }

// type setAuthUserDataActionType = {
//     type: typeof SET_USER_DATA
//     data: setAuthUserDataActionDataType
// }

const actions = {
    setAuthUserData : (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA, data: { userId, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccess : (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS, payload : {captchaUrl}
    } as const),
}




// type getCaptchaUrlSuccessAvtionType = {
//     type: typeof GET_CAPTCHA_URL_SUCCESS
//     payload: {captchaUrl: string}

// } 

//thunk down
export const getAuthUserData = (): ThunkType => async (dispatch: any) => {
    let response = await authAPI.me()   
    if (response.resultCode === resultCodeEnum.Succes) {
        let { id, email, login } = response.data
        //НЕ ЗАБЫВАТЬ ДИСПАТЧИТЬ СЕТЫ
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: null | string): ThunkType => async (dispatch: any) => {
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
export const logout = () : ThunkType => async (dispatch: any) => {
    let response = await authAPI.logout()
            if (response.data.resultCode === resultCodeEnum.Succes) {
                dispatch(getAuthUserData())
            }
}



export const setCaptchaUrl = () => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}




export default authReducer