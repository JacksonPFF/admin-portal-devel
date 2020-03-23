import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userActions, registeredGitasActions } from '../_actions';
import { skipCodeConstants } from '../_constants';

function HomePage(props) {
  const { user, registeredGitas, skipCode, dispatch } = props;

  useEffect(() => {
    dispatch(registeredGitasActions.getAll());
    dispatch({ type: skipCodeConstants.SKIPCODE_POLL_START });
    return function cleanup() {
      dispatch({ type: skipCodeConstants.SKIPCODE_POLL_STOP });
    };
  }, []);

  return (
    <div>
      
      <div className="row">
        <div className="col-md-11">
          <div className="media">
            <img src={user.profilePicture} alt="Profile Picture"
                style={{maxWidth:"80px"}}
                className="
                    img-fluid 
                    rounded-circle
                    w-25 mr-3" />
            <div className="media-body">
              <h1>Hi {user.firstName}!</h1>
              <p>You're logged in with React & JWT!!</p>  
            </div>
          </div>
        </div>
        <div className="col-md-1">
          <p className="text-right">
            <Link to="/login">Logout</Link>
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <div className="sticky-top">
            <h3>Registered Gitas:</h3>
            <p>From secure api endpoint</p>
            {registeredGitas.loading && <em>Loading registered gitas...</em>}
            {registeredGitas.error && <span className="text-danger">ERROR: {registeredGitas.error}</span>}
            {registeredGitas.items &&
              <ul>
                {registeredGitas.items.map((gita, index) =>
                  <li key={gita.serial} className="mb-3">
                    <div><b>Serial:</b> {gita.output.serial}</div> 
                    <div><b>Name:</b> {gita.output.name}</div>
                    <div><b>Registered by:</b> {gita.output.registeredByUsername}</div>
                    <div><b>Email:</b> {gita.output.registeredByEmail}</div>
                    <div><b>Date:</b> {gita.output.created}</div>
                  </li>
                )}
              </ul>
            }
          </div>
        </div>

        <div className="col-md-6">
          <h3> Wifi Skip Code </h3>
          <p>Updates every 15 seconds</p>
          <p><b>{ skipCode.data }</b></p>
        </div>
      </div>

    </div>
  );
}

function mapStateToProps(state) {
    const { registeredGitas, skipCode, authentication } = state;
    const { user } = authentication;
    return {
        user,
        registeredGitas,
        skipCode,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
