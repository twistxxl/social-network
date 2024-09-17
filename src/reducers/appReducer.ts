import { getAuthUserData } from "./authReducer.ts";
import { inferActionsTypes } from "./reduxStore.ts";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"

let initialState = {
    initialized: false,
}

export type initialStateType = typeof initialState
type ActionType = inferActionsTypes<typeof actions>


const appReducer = (state = initialState, action: ActionType): initialStateType  => {

    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }   
        }

        default:
            return state
    }
}

export const actions = {
    setInitializedSuccess: () => ({ type: INITIALIZED_SUCCESS, a: 'as' })

}


//thunk
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.setInitializedSuccess())
        })
}


export default appReducer