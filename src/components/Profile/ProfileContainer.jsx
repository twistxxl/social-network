

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getStatus, getUserProfile, updateStatus, savePhoto, saveProfile } from "../../reducers/profileReducer";
import withAuthRedirect from "../../HOC/withAuthRedirect"


const ProfileContainer = (props) => {

    let { id } = useParams();
    if (!id) {
        id = props.autherizedUserId

        if (!id) {
            props.history.push('/login')
        }
    }

    useEffect(() => {
        props.getUserProfile(id);
    }, [id]);

    useEffect(() => {
        props.getStatus(id);
    }, []);

    return (
        <div>
            <Profile
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                isOwner={!!id}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
                postsData={props.postsData}
                newPostText={props.newPostText}
                store={props.store}
                
            />
        </div>
    );
};

let AuthRiderectComponent = withAuthRedirect(ProfileContainer)
//ниже отправка куда??
const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
    status: state.profilePage.status,
    autherizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth

});


export default connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile })(AuthRiderectComponent);