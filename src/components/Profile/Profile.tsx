import React from "react";
//@ts-ignore
import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";
import MyPostsContainer from "./MyPosts/MyPostsContainer.tsx";
import { ProfileType } from "../../types/types.ts";

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    store: any
}


const Profile: React.FC<PropsType> = (props) => {


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