import React from 'react';
import { BrowserRouter, Router, Switch } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { history } from '../router/history';
import Routes from '../router/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
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
