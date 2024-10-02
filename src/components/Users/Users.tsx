import React, { useEffect } from "react";
import Paginator from "./Paginator.tsx"
import User from "./User.tsx"
import { userType } from "../../types/types";
import UserSearchForm from "./UserSearchForm.tsx"
import { FilterType, getUsersThunkCreator } from "./../../reducers/usersReducer.ts"
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../reducers/usersSelectors.ts"
import { follow, unfollow } from "../../reducers/usersReducer.ts"
type PropsType = {
//     setCurrentPage: (pageNumber: number) => void
//     toggleFollowingInProgress: (isFetching: boolean, userId: number) => void
}


const Users: React.FC<PropsType> = (props) => {

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
    }, [])

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()



    //должно быть внутри фун-ий dispatch(funcAC(parameters))
    //если сделать так, то ts ошибки кидает, оставил голыми
    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)

    }

    return (
        <div>
            <UserSearchForm  onFilterChanged={onFilterChanged}/>
            <Paginator 
            currentPage={currentPage} 
            onPageChanged={onPageChanged} 
            totalItemsCount={totalUsersCount} 
            pageSize={pageSize} 
            />

            {users.map(user => {
                return <User
                key={user.id} 
                user={user} 
                followingInProgress={followingInProgress} 
                follow={follow} 
                unfollow={unfollow}/>
            })}
        </div>
    )

}


export default Users