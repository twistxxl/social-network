import React, { useEffect } from "react";
import { PathRouteProps, useNavigate, useParams,  } from "react-router-dom";
import { connect } from "react-redux";
import Profile from "./Profile.tsx";
import { getStatus, getUserProfile, updateStatus, savePhoto, saveProfile } from "../../reducers/profileReducer.ts";
import withAuthRedirect from "../../HOC/withAuthRedirect.tsx";
import { ProfileType } from "../../types/types.ts";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    store: any
}

type PropsType = MapPropsType & DispatchPropsType


const ProfileContainer: React.FC<PropsType> = (props) => {

    let { id } = useParams<{ id: any }>()
    if (!id) {
        id = props.autherizedUserId

        if (!id) {
            //@ts-ignore
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

//@ts-ignore
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