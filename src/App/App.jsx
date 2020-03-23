import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { topics } from '../_routes';
import { LoginPage } from '../LoginPage';
import { SidebarLayout } from '../_components';

function App(props) {
  const { dispatch } = props;

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <div>
      <Route exact path='/' component={LoginPage} />
      <Route path='/app' component={SidebarLayout} />
    </div>
  );
}

function mapStateToProps(state) {
  const { alert } = state;
  const { loggedIn } = state.authentication;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
