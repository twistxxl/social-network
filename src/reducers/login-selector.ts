import { AppStateType } from "./reduxStore";

export const selectCurrentUserLogin = (state: AppStateType) => {
    return state.auth.login
}