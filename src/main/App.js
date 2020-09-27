import React from 'react';
import { Router, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { history } from '../router/history';
import Routes from '../router/Routes';

import './App.css';
const App = () => {
  return (
    <Router history={history}>
      <BrowserRouter>
        <PageHeader />
        <Switch>
          <Routes />
        </Switch>
      </BrowserRouter>
    </Router>
  );
};

export default App;
