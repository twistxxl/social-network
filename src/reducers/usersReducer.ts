import { Dispatch } from "redux"
import { usersAPI } from "../api/users-api.ts"
import { userType } from "../types/types"
import { AppStateType } from "./reduxStore"
import { ThunkAction } from "redux-thunk"
import {inferActionsTypes} from "../reducers/reduxStore.ts"

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const CURRENT_PAGE = 'users/CURRENT_PAGE'
const SET_TOTAL_COUNT_USERS = 'users/SET_TOTAL_COUNT_USERS'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'



let initialState = {
    users: [] as Array<userType>,
    pageSize: 100,
    totalUsersCount: 10,
    currentPage: 2,
    isFetching: false,
    followingInProgress: [] as Array<number> //массив с юзер айдишниками(ass)
}

type initialStateType = typeof initialState


const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {

    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true }
                    }
                    return user
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false }
                    }
                    return user
                })
            }

        case SET_USERS:
            return { ...state, users: action.users }
        case CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case SET_TOTAL_COUNT_USERS:
            return { ...state, totalUsersCount: action.totalCount }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state

    }

}

type ActionsTypes = inferActionsTypes<typeof actions>

export const actions = {
    setTotalUsersCountAC: (totalCount: number) => ({ type: SET_TOTAL_COUNT_USERS, totalCount } as const),
    setCurrentPageAC: (currentPage: number) => ({ type: CURRENT_PAGE, currentPage } as const),
    followAC: (userId: number) => ({ type: FOLLOW, userId } as const),
    unfollowAC: (userId: number) => ({ type: UNFOLLOW, userId } as const),
    setUsersAC: (users: userType) => ({ type: SET_USERS, users } as const),
    toggleIsFetchingAC: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching } as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId } as const)
}




type GetStateType = () => AppStateType
type CurrentDispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsersThunkCreator = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {

        dispatch(actions.toggleIsFetchingAC(true))
        dispatch(actions.setCurrentPageAC(page))
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.toggleIsFetchingAC(false))
        dispatch(actions.setUsersAC(data.items))
        dispatch(actions.setTotalUsersCountAC(data.totalCount))
    }

}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingInProgress(true, userId))
        let response = follow(userId)
        if (response.data.resultCode === 0) {
            dispatch(actions.followAC(userId))
        }
        dispatch(actions.toggleFollowingInProgress(false, userId))

    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: any) => {
        dispatch(actions.toggleFollowingInProgress(true, userId))
        let response = unfollow(userId)
        if (response.data.resultCode === 0) {
            dispatch(actions.unfollowAC(userId))
        }
        dispatch(actions.toggleFollowingInProgress(false, userId))
    }
}

export default usersReducer