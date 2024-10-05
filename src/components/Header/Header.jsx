import React from "react";
import style from './Header.module.css'
import { NavLink } from "react-router-dom";
import { Menu, Avatar, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../reducers/auth-selector";



//не стал типизировать, 11 урок (1:59:00) он типизурет этот файл

export const Header = (props) => {
    const { Header } = Layout;

    const isAuth = useSelector(selectIsAuth)

    return (

        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            // items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />
          <Avatar 
          src='' 
          size="large" 
          shape='circle' 
          icon={<UserOutlined />} 
          style={{ marginRight: '10px', backgroundColor: '#1677ff', cursor: 'pointer' }}
          />
        </Header>

        // <header className={style.header}>
        //     <img src="https://static.tildacdn.com/tild3334-3366-4639-a430-313739346332/575a9a3785e2c15539ea.png" alt="logo" />
        //     <div className={style.loginBlock}>
        //         {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>LogOut</button> </div> : <NavLink to={'/login'}>Login</NavLink>}
        //     </div>
        // </header>
    )
}
