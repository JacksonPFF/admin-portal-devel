import React, { useState, useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';

function App(props) {
  const { dispatch } = props;
  const { alert } = props;

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <div className="jumbotron">
      <div className="container">

        <div className="row">
          <div className="col-md-4 offset-md-4">
            {alert.message &&
              <div className={`alert   ${alert.type}`}>{alert.message}</div>
            }
          </div>
        </div>

        <Router history={history}>
        <div className="row">
            <PrivateRoute exact path="/" component={HomePage} />
            
            <Route path="/login" component={LoginPage} />
        </div>
        </Router>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 