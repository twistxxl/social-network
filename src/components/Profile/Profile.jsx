import React from "react";
import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = (props) => {


    return (
        <div className={style.content}>
                        
            <ProfileInfo 
            profile={props.profile} 
            status={props.status} 
            updateStatus={props.updateStatus}
            isOwner={props.isOwner}
            savePhoto={props.savePhoto}
            saveProfile={props.saveProfile}
            />
            <MyPostsContainer
                store={props.store} 
                
                />
        </div>
    )
}


export default Profile;