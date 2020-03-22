import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import ROUTES, { RenderRoutes } from "../routes";
import { LoginPage } from '../LoginPage';
 
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
      <RenderRoutes routes={ROUTES} /> 
      {/* <Route exact path='/' component={LoginPage} /> */}
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
