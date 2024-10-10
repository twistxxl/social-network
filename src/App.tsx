import React, { useEffect, Suspense, ComponentType } from 'react';
import './App.css';
//@ts-ignore
import style from './components/Navbar/Navbar.module.css'
import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer.tsx';
import HeaderContainer from './components/Header/HeaderContainer.jsx';
import { Login } from './components/Login/Login.tsx';
import { connect } from 'react-redux';
import { initializeApp } from './reducers/appReducer.ts';
import { compose } from 'redux';
import { AppStateType } from './reducers/reduxStore.ts';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Layout, Menu, theme } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import { Header } from './components/Header/Header.jsx';

const { Content, Sider } = Layout;


const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.tsx'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage.tsx'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const App = (props: MapPropsType & DispatchPropsType) => {

  useEffect(() => {
    props.initializeApp()
  }, [])

  if (!props.initialized) {
    return <h1>loading...</h1>
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['profile']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            // items={items2}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="Профиль">
                <Menu.Item key="profile">
                  <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="dialogs">
                  <Link to="/dialogs">Messages</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="Пользователи">
                <Menu.Item key="users">
                  <Link to="/users">Users</Link>
                </Menu.Item>
                <Menu.Item key="users">
                  <Link to="/chat">Chat</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="Прочее">
                <Menu.Item key="news">
                  <Link to="/news">News</Link>
                </Menu.Item>
                <Menu.Item key="music">
                  <Link to="/music">Music</Link>
                </Menu.Item>
                <Menu.Item key="settings">
                  <Link to="/settings">Settings</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb
              items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
              style={{ margin: '16px 0' }}
            />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                // borderRadius: borderRadiusLG,
              }}>
              <div className='app-wrapper-content'>
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path='/dialogs' element={<DialogsContainer store={props.store} />} />
                    <Route path='/profile/:id?' element={
                      <ProfileContainer
                        store={props.store}
                        postsData={props.postsData}
                        dispatch={props.dispatch}
                        newPostText={props.newPostText}
                      />
                    } />
                    <Route path='/users' element={<UsersContainer pageTitle={"samurai"} />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/chat' element={<ChatPage />} />
                    <Route path='*' element={<div>
                      <span>404 NOT FOUND</span>
                    </div>} />
                  </Routes>
                </Suspense>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </BrowserRouter>
    // {/* </Layout>
    //   <BrowserRouter >  
    //     <div className="app-wrapper">  
    //       <HeaderContainer />  
    // <Navbar />  
    //       <div className='app-wrapper-content'>  
    //        
    //       </div>  
    //     </div>  
    //   </BrowserRouter>   */}
  )
}

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized
  }
}

export default compose<React.ComponentType>(connect(mapStateToProps, { initializeApp }))(App);


//https://stackoverflow.com/questions/47928735/react-scripts-is-not-recognized-as-an-internal-or-external-command
// для запуска npm start при клнирвонии проекта через гит