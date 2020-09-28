import React from 'react';
import { Redirect, Route } from 'react-router';
import Home from '../pages/Home';
import Pokedex from '../pages/Pokedex';
import Pokemon from '../pages/Pokemon';

const Routes = () => {
  return (
    <>
      <Route exact path='/' component={Home} />
      <Route exact path='/home' render={() => <Redirect to='/' />} />
      <Route exact path='/pokedex' component={Pokedex} />
      <Route exact path='/pokemon:id' component={Pokemon} />
    </>
  );
};

export default Routes;
