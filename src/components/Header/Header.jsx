import React from "react";
import style from './Header.module.css'
import { Link, NavLink } from "react-router-dom";
import { Menu, Avatar, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth } from "../../reducers/auth-selector.ts";
import { selectCurrentUserLogin } from "../../reducers/login-selector.ts";
import { logout } from "../../reducers/authReducer.ts";
import {Button} from "antd";


//не стал типизировать, 11 урок (1:59:00) он типизурет этот файл

export const Header = (props) => {
    const { Header } = Layout;

    const items1 = ["TheDevelopers"].map((key) => ({
        key,
        label: `${key}`,
      }));

    const isAuth = useSelector(selectIsAuth) 
    const login = useSelector(selectCurrentUserLogin) || 'Nickname'

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }



    return (

        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={items1}
                style={{ flex: 1, minWidth: 0 }}
            />

{isAuth ? (  
                <div>  
                    <Avatar  
                        src=''  
                        size="large"  
                        shape='circle'  
                        icon={<UserOutlined />}  
                        style={{ marginRight: '10px', backgroundColor: '#1677ff', cursor: 'pointer' }}  
                    />  
                    {login}  
                    <Button onClick={logoutCallback}>LogOut</Button>  
                </div>  
            ) : (  
                <NavLink to={'/login'}>Login</NavLink>  
            )}  

        </Header>

        // <header className={style.header}>
        //     <img src="https://static.tildacdn.com/tild3334-3366-4639-a430-313739346332/575a9a3785e2c15539ea.png" alt="logo" />
        //     <div className={style.loginBlock}>
        //         {props.isAuth ? <div>{props.login} - <button onClick={logoutCallback}>LogOut</button> </div> : <NavLink to={'/login'}>Login</NavLink>}
        //     </div>
        // </header>
    )
}
