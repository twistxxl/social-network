import { profileAPI } from "../api/profile-api.ts";
import {ProfileType, PostType, photosType} from '../types/types.ts'

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

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {

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

type addPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}

export const addPostActionCreator = (newPostText: string): addPostActionCreatorType => {
    return {
        type: ADD_POST,
        newPostText
    }
}

type setUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): setUserProfileType => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

type setStatusType = {
    type: typeof SET_STATUS
    status: string
}

export const setStatus = (status: string): setStatusType => {
    return {
        type: SET_STATUS,
        status: status
    }
}

type savePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: photosType
}

export const savePhotoSuccess = (photos: photosType): savePhotoSuccessType => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    }
}



//thunk down
//если есть запрос на сервер(в нашем случае ajax), то нужно использовать thunk

export const getUserProfile = (userId: number) => {

    return async (dispatch: any) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(data))
    }
}

export const getStatus = (userId: number) => {
    return async (dispatch: any) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(setStatus(data))
    }
}

export const updateStatus = (status: string) => {
    return async (dispatch: any) => {
        let data = await profileAPI.updateStatus(status)
                if (data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
    }
}

export const savePhoto = (file: any) => {
    return async (dispatch: any) => {
        let data = await profileAPI.savePhoto(file)
        if (data.resultCode === 0) {
            dispatch(setUserProfile(data.data.photos))
        }
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if(data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
}


export default profileReducer