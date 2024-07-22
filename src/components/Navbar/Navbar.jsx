import React from "react";
import style from './Navbar.module.css'
import { Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={style.nav}>
            <div><Link to="/profile">Profile</Link></div>
            <div><Link to="/dialogs">Messages</Link></div>
            <div><Link to="/users">Users</Link></div>
            <div><Link to="/news">News</Link></div>
            <div><Link to="/music">Music</Link></div>
            <div><Link to="/settings">Settings</Link></div>
        </nav>

    )
}

export default Navbar