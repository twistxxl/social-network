import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../reducers/reduxStore";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

type MapStateToPropsType = {
    isAuth: boolean
}


const withAuthRedirect = (Component: React.ComponentType) => {
    const RedirectComponent = (props: MapStateToPropsType) => {
        let {isAuth, ...restProps} = props
        
        if(!props.isAuth){
            return <Navigate to={'/login'}/>
        }
        return <Component {...restProps} />
    }

    let connectedAuthRiderectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return connectedAuthRiderectComponent
}

export default withAuthRedirect