import { profileAPI } from "../api/profile-api.ts";
import {ProfileType, PostType, photosType} from '../types/types.ts'
import {inferActionsTypes} from './reduxStore.ts'
import { BaseThunkType } from "./reduxStore.ts";
import { FormAction } from "redux-form";


const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_STATUS = 'profile/SET-STATUS';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE-PHOTO-SUCCESS';





let initialState = {
    postsData: [
        { id: 1, message: "Hi", likesCount: 13 },
        { id: 2, message: "How are you", likesCount: 20 },
        { id: 3, message: "Yo", likesCount: 4 },
        { id: 4, message: "Its my first", likesCount: 5 },
        { id: 5, message: "I love sex", likesCount: 666 },
        { id: 6, message: "We love womens", likesCount: 0 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "Нет статуса",
    newPostText: ''
}


const profileReducer = (state = initialState, action: ActionType): initialStateType => {

    switch (action.type) {
        case ADD_POST: {

            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            let copyState = {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            }
            return copyState
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
                // as ProfileType временно
            }
        }
        default:
            return state
    }

}

export const actions = {

    addPostActionCreator: (newPostText: string) => ({ type: ADD_POST, newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
    setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    savePhotoSuccess: (photos: photosType) => ({ type: SAVE_PHOTO_SUCCESS, photos } as const)
}



//thunk down
//если есть запрос на сервер(в нашем случае ajax), то нужно использовать thunk

export const getUserProfile = (userId: number): ThunkType => {

    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data))
    }
}

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(data))
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.updateStatus(status)
                if (data.resultCode === 0) {
                    dispatch(actions.setStatus(status))
                }
    }
}

export const savePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.savePhoto(file)
        if (data.resultCode === 0) {
            dispatch(actions.setUserProfile(data.data.photos))
        }
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState: any) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if(data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
}

export type initialStateType = typeof initialState
type ActionType = inferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>



export default profileReducer