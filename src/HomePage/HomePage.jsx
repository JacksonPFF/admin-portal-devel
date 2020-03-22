import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

function HomePage(props) {
  const { user, users, dispatch } = props;

  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);

  return (
      <div className="col-md-9">
          <img src={user.profilePicture} 
              className="
                  img-fluid 
                  rounded-circle
                  w-25
                  mb-3" 
              alt="Profile Picture"></img>
          <h1>Hi {user.firstName}!</h1>
          <p>You're logged in with React & JWT!!</p>
          <h3>Registered Gitas:</h3>
          <p>From secure api endpoint</p>
          {users.loading && <em>Loading users...</em>}
          {users.error && <span className="text-danger">ERROR: {users.error}</span>}
          {users.items &&
            <ul>
              {users.items.map((user, index) =>
                <li key={user.serial} className="mb-3">
                  <div><b>Serial:</b> {user.output.serial}</div> 
                  <div><b>Name:</b> {user.output.name}</div>
                  <div><b>Registered by:</b> {user.output.registeredByUsername}</div>
                  <div><b>Email:</b> {user.output.registeredByEmail}</div>
                  <div><b>Date:</b> {user.output.created}</div>
                </li>
              )}
            </ul>
          }
          {/* <p>
              <Link to="/">Logout</Link>
          </p> */}
      </div>
  );
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
