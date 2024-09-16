import React, {useEffect} from "react";
import { connect } from "react-redux";
import Header from "./Header";
import {  logout } from "../../reducers/authReducer.ts";



const HeaderContainer = (props) => {
    


    return (
        <Header {...props} />
    )
}    

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
//getAuthUserData и logout это пропсы из authReducer, их прокидываешь дальше в Header

export default connect(mapStateToProps, { logout})(HeaderContainer)