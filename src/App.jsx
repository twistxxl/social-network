import React, { useEffect, Suspense } from 'react';  
import './App.css';  
import Navbar from './components/Navbar/Navbar';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import UsersContainer from './components/Users/UsersContainer';  
import HeaderContainer from './components/Header/HeaderContainer';  
import Login from './components/Login/Login';  
import { connect } from 'react-redux';  
import { initializeApp } from './reducers/appReducer';  
import { compose } from 'redux';  

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))  
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))  

const App = (props) => {  

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
              <Route path='/users' element={<UsersContainer />} />  
              <Route path='/login' element={<Login />} />  
            </Routes>  
          </Suspense>  
        </div>  
      </div>  
    </BrowserRouter>  
  );  
}  

const mapStateToProps = (state) => {  
  return {  
    initialized: state.app.initialized  
  }  
}  

export default compose(connect(mapStateToProps, { initializeApp }))(App);