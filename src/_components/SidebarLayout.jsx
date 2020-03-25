import React, { useState, useEffect } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { routes } from '../_routes';
import { Navigation } from '../_components';
import { HomePage } from '../HomePage';
import '../_css/sidebarLayout.css'

function SidebarLayout(props) {
  const { user, dispatch } = props;

  if (!user) {
    return <Redirect to="/" />;
  }

  function generateLinks() {
    return (
      <React.Fragment>
        {routes.map((route, index) => (
          <Route
          key={index}
          path={`${props.match.url}${route.path}`}
          exact={true}
          children={({ match }) => (
            <li className='nav-item'>
              <Link className={'nav-link ' + (match ? "active" : "") } 
                to={`${props.match.url}${route.path}`}>
                {route.name}
              </Link>
            </li>
          )}
        />
        ))}
      </React.Fragment>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <Link to={`${props.match.url}`} className="navbar-brand col-sm-3 col-md-2 mr-0">PFF Admin Portal</Link>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <Link to="/" className="nav-link">Sign out</Link>
          </li>
        </ul>
      </nav>
  
      <div className="container-fluid">
        <div className="row">
          
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky pt-3">
            
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <div className="media">
                      <img src={user.profilePicture} 
                          style={{maxWidth: "54px"}} 
                          className="mr-3 rounded-circle" 
                          alt="Profile Picture"/>
                      <div className="media-body">
                        <h5 className="mb-0 mt-3">Hi {user.firstName}!</h5>
                        {/* <small>You're logged in with React & JWT</small> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr/>

              <ul className="nav flex-column">
                {generateLinks()}
              </ul>

            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2 mt-3">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group">
                  <button className="btn btn-sm btn-outline-secondary">Share</button>
                  <button className="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                {/* <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                  <span data-feather="calendar"></span>
                  This week
                </button> */}
              </div>
            </div>
            <div>
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={`${props.match.path}${route.path}`}
                    exact={route.exact}
                    children={<route.component />}
                  />
                ))}
              </Switch>
            </div>
          </main>

        </div> {/* end row */}
      </div> {/* end container-fluid */}
    </div>
  );
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
      user,
  };
}

const connectedSidebarLayout = connect(mapStateToProps)(SidebarLayout);
export { connectedSidebarLayout as SidebarLayout };
