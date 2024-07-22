import React from "react";
import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = (props) => {


    return (
        <div className={style.content}>
            {/* <div>
                <img src="https://it-butik.ru/uploads/images/blog/2023-02-18/VHrnvwULjsSnqM861bSoUZrVCRdDaDzDTzi8ysAj.jpg" alt="" srcset="" />
            </div> */}
            
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer
                store={props.store} 
                
                />
        </div>
    )
}


export default Profile;