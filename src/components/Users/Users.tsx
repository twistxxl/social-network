import React from "react";
import Paginator from "./Paginator.tsx"
import User from "./User.tsx"
import { userType } from "../../types/types";
import UserSearchForm from "./UserSearchForm.tsx"
import { FilterType } from "./../../reducers/usersReducer.ts"

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    users: Array<userType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
    setCurrentPage: (pageNumber: number) => void
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => void
    onFilterChanged: (filter: FilterType) => void
}


const Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, follow, unfollow, followingInProgress, ...props}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)

    }

    return (
        <div>
            <UserSearchForm  onFilterChanged={props.onFilterChanged}/>
            <Paginator 
            currentPage={currentPage} 
            onPageChanged={onPageChanged} 
            totalItemsCount={totalUsersCount} 
            pageSize={pageSize} 
            />

            {users.map(user => {
                return <User key={user.id} user={user} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow}/>
                    {/* <span>
                        <div>
                            <Link to={'/profile/' + user.id}>
                                <img src={user.photos.small != null ? user.photos.small : userPhoto} className={style.userPhoto} alt="userPhoto" />
                            </Link>
                        </div>
                        <div>
                            {user.followed
                                ?
                                <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                    props.unfollow(user.id)
                                }}>Unfollow</button>
                                :
                                <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                   props.follow(user.id)
                                }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"user.location.country"}</div>
                            <div>{"user.location.city"}</div>
                        </span>
                    </span> */}
            })}
        </div>
    )

}


export default Users