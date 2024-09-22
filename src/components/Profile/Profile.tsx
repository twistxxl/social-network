import React from "react";
//@ts-ignore
import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";
import MyPostsContainer from "./MyPosts/MyPostsContainer.tsx";


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