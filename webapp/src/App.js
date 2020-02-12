import React from 'react';

import './App.scss';
import UsersList from './pages/users-list/users-list';
import NumbersList from './pages/numbers/numbers';

function App() {
  return (
    <>
      <UsersList />
      <NumbersList />
    </>
  );
}

export default App;
