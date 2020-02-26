import React from 'react';

import { Provider } from 'react-redux'

import configureStore from './configureStore';
import * as sagas from './sagas';
import VerifyUser from './component/users/VerifyUser';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

import { INITIAL_STATE } from './reducers';

const store = configureStore(INITIAL_STATE);
Object.values(sagas).forEach((saga) => {
  store.runSaga(saga)
});




export default function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <VerifyUser />
    </Provider>
  );
}