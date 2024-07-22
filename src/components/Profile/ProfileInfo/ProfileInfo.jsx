import React from "react";
import style from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <div>Loading...</div>;
    }

    
    return (
        <div>
            <div className={style.avatar}>
                {props.profile.photos && props.profile.photos.large && <img src={props.profile.photos.large} alt="" />}
            </div>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        </div>
    );
}

export default ProfileInfo;