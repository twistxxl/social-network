import store from './reducers/reduxStore.ts';
import React from 'react';
import ReactDOM from 'react-dom';
// import store from './state'
import {Provider} from 'react-redux';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const rerenderEntireTree = (props) => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
      <App
        postsData={props.profilePage.postsData}
        dialogsData={props.messagesPage.dialogsData}
        messagesData={props.messagesPage.messagesData}
        newPostText={props.profilePage.newPostText}
        dispatch={store.dispatch.bind(store)}
        store={store}
      />
      </Provider>
    </React.StrictMode>
  );
}

rerenderEntireTree(store.getState());
store.subscribe(() => {
  rerenderEntireTree(store.getState());
});