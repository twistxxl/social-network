import React, { useEffect, Suspense, ComponentType } from 'react';  
import './App.css';  
import Navbar from './components/Navbar/Navbar.jsx';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import UsersContainer from './components/Users/UsersContainer.tsx';  
import HeaderContainer from './components/Header/HeaderContainer.jsx';  
import {Login} from './components/Login/Login.tsx';  
import { connect } from 'react-redux';  
import { initializeApp } from './reducers/appReducer.ts';  
import { compose } from 'redux';  
import { AppStateType } from './reducers/reduxStore.ts';


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'))  
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.tsx'))  

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

  return (  
    <BrowserRouter >  
      <div className="app-wrapper">  
        <HeaderContainer />  
        <Navbar />  
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
            </Routes>  
          </Suspense>  
        </div>  
      </div>  
    </BrowserRouter>  
  );  
}  

const mapStateToProps = (state: AppStateType) => {  
  return {  
    initialized: state.app.initialized  
  }  
}  

export default compose<React.ComponentType>(connect(mapStateToProps, { initializeApp }))(App);


//https://stackoverflow.com/questions/47928735/react-scripts-is-not-recognized-as-an-internal-or-external-command
// для запуска npm start при клнирвонии проекта через гит