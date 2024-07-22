import React from "react";
import style from "./Users.module.css"
import userPhoto from "../../asssets/images/andrew-tate-3.jpg"
import { Link } from "react-router-dom"




const User = ({user, followingInProgress, follow, unfollow}) => {

    return (
        <div>
            <div>
                <span>
                    <div>
                        <Link to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} className={style.userPhoto} alt="userPhoto" />
                        </Link>
                    </div>
                    <div>
                        {user.followed
                            ?
                            <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                unfollow(user.id)
                            }}>Unfollow</button>
                            :
                            <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                follow(user.id)
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
                </span>
            </div>
        </div>
    )
}


export default User