import { getProfile, profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

let initialState = {
    postsData: [
        { id: "1", message: "Hi", likesCount: "15" },
        { id: "2", message: "How are you", likesCount: "20" },
        { id: "3", message: "Yo", likesCount: "10" },
        { id: "4", message: "Its my first", likesCount: "5" },
        { id: "5", message: "I love sex", likesCount: "666" },
        { id: "6", message: "We love womens", likesCount: "0" },
    ],
    profile: null,
    status: "Нет статуса"
}

const profileReducer = (state = initialState, action) => {

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
        default:
            return state
    }

}

export const addPostActionCreator = (newPostText) => {
    return {
        type: ADD_POST,
        newPostText
    }
}

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status: status
    }
}


//thunk down
//если есть запрос на сервер(в нашем случае ajax), то нужно использовать thunk

export const getUserProfile = (userId) => {

    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}

export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
    }
}


export default profileReducer