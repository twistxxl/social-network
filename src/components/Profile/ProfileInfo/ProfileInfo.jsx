import React, { useState } from "react";
import style from "./ProfileInfo.module.css";
import userPhoto from "../../../asssets/images/andrew-tate-3.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDescriptionReduxForm from "./ProfileDescriptionForm";
import ProfileDescription from "./ProfileDescription";




const ProfileInfo = (props) => {

    const [editMode, setEditMode] = useState(false);


    if (!props.profile) {
        return <div>Loading...</div>;
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }
    const onSubmit = (formData) => {
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