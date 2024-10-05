import { AppStateType } from "./reduxStore";


export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}