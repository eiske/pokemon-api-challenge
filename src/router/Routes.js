import React from 'react';
import { Redirect, Route } from 'react-router';
import Home from '../pages/Home';
// import Episodes from '../pages/Episodes';

const Routes = () => {
  return (
    <>
      <Route exact path='/' component={Home} />
      <Route exact path='/home' render={() => <Redirect to='/' />} />
    </>
  );
};

export default Routes;
