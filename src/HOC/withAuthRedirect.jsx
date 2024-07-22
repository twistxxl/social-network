import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});


const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if(!props.isAuth){
            return <Navigate to={'/login'}/>
        }

        return <Component {...props} />
    }

    let connectedAuthRiderectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return connectedAuthRiderectComponent
}

export default withAuthRedirect