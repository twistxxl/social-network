import React from "react";
import style from './Header.module.css'
import { NavLink } from "react-router-dom";


//не стал типизировать, 11 урок (1:59:00) он типизурет этот файл

const Header = (props) => {
    return (
        <header className={style.header}>
            <img src="https://static.tildacdn.com/tild3334-3366-4639-a430-313739346332/575a9a3785e2c15539ea.png" alt="logo" />
            <div className={style.loginBlock}>
                {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>LogOut</button> </div> : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header