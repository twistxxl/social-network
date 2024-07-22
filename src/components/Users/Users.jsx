import React from "react";
import Paginator from "./Paginator"
import User from "./User"




const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)

    }

    return (
        <div>
            <Paginator 
            currentPage={props.currentPage} 
            onPageChanged={props.onPageChanged} 
            totalItemsCount={props.totalUsersCount} 
            pageSize={props.pageSize} 
            />

            {props.users.map(user => {
                return <User key={user.id} user={user} followingInProgress={props.followingInProgress} follow={props.follow} unfollow={props.unfollow}/>
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