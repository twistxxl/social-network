import { getAuthUserData } from "./authReducer.ts";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"

export type initialStateType = {
    initialized: boolean
}


let initialState: initialStateType = {
    initialized: false,
}


const appReducer = (state = initialState, action: any): initialStateType  => {

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

type setInitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

//actionCreator
export const setInitializedSuccess = (): setInitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

//thunk
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializedSuccess())
        })
}


export default appReducer