import React, { ChangeEvent, useState } from "react";
//@ts-ignore
import style from "./ProfileInfo.module.css";
//@ts-ignore
import userPhoto from "../../../asssets/images/andrew-tate-3.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDescriptionReduxForm from "./ProfileDescriptionForm.tsx";
import ProfileDescription from "./ProfileDescription.tsx";
import { ProfileType } from "../../../types/types.ts";


type propsType = {
    profile: any
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<propsType> = (props) => {

    const [editMode, setEditMode] = useState(false);


    if (!props.profile) {
        return <div>Loading...</div>;
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0]);
        }
    }
    //todo: remove then
    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false);
        });
    }

   


    return (
        <div>
            <div className={style.avatar}>
                {/* {props.profile.photos && props.profile.photos.large && <img src={props.profile.photos.large} alt="" />} */}
                <img src={props.profile.photos.large || userPhoto} alt="" />
                {props.isOwner && <input type="file" onChange={onMainPhotoSelected} />}
                {editMode 
                ? <ProfileDescriptionReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} /> 
                : <ProfileDescription profile={props.profile} isOwner={props.isOwner}  goToEditMode={() => { setEditMode(true) }} />}
            </div>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
        </div>
    );
}

export default ProfileInfo;