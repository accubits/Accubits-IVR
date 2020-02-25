import React from 'react';

import { Provider } from 'react-redux'

import store from './configureStore';
import VerifyUser from './component/users/VerifyUser';

import './App.scss';  

export default function App() {
  return (
    <Provider store={store}>
      <VerifyUser />
    </Provider>
  );
}