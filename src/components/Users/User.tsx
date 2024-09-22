import React from "react";
//@ts-ignore
import style from "./Users.module.css"
//@ts-ignore
import userPhoto from "../../asssets/images/andrew-tate-3.jpg"
import { Link } from "react-router-dom"
import ts from "typescript";
import { userType } from "../../types/types";

type PropsType = {
    user: userType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}


const User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {

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