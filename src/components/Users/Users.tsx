import React, { useEffect } from "react";
import Paginator from "./Paginator.tsx"
import User from "./User.tsx"
import { userType } from "../../types/types";
import UserSearchForm from "./UserSearchForm.tsx"
import { FilterType, getUsersThunkCreator } from "./../../reducers/usersReducer.ts"
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../reducers/usersSelectors.ts"
import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';


type PropsType = {
//     setCurrentPage: (pageNumber: number) => void
//     toggleFollowingInProgress: (isFetching: boolean, userId: number) => void
}


const Users: React.FC<PropsType> = (props) => {

    

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    const history = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const parsed: {term?: string, page?: string, friend?: string} = queryString.parse(location.search)
        
        let actualPage = currentPage
        let actualFilter = filter
        if(parsed.page) actualPage = Number(parsed.page)
        if(parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if(parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false}
        
        
        // @ts-ignore
        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
    }, [])

    
    useEffect(() => {
        history({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])


    //должно быть внутри фун-ий dispatch(funcAC(parameters))
    //если сделать так, то ts ошибки кидает, оставил голыми
    const onPageChanged = (pageNumber: number) => {
        //@ts-ignore
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        //@ts-ignore
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        //@ts-ignore
        dispatch(follow(userId))
    }
    const unfollow = (userId: number) => {
        //@ts-ignore
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