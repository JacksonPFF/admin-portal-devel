import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ROUTES, { RenderRoutes } from '../routes';
import { Navigation } from '../_components';
import { HomePage } from '../HomePage';
import '../_css/SidebarLayout.css'

function SidebarLayout(props) {

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">PFF Admin Portal</a>
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
            <div className="sidebar-sticky">

              {Navigation(ROUTES)}

              {/* <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    <span data-feather="home"></span>
                    Dashboard <span className="sr-only">(current)</span>
                  </a>
                </li>
              </ul> */}
            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                  <button className="btn btn-sm btn-outline-secondary">Share</button>
                  <button className="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                {/* <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                  <span data-feather="calendar"></span>
                  This week
                </button> */}
              </div>
            </div>
            <div className="jumbotron">
              <div className="container">
                <div className="row">
                  <HomePage /> 
                </div>
              </div>
            </div>
          </main>

        </div> {/* end row */}
      </div> {/* end container-fluid */}
    </div>
  );
}

const connectedSidebarLayout = connect()(SidebarLayout);
export { connectedSidebarLayout as SidebarLayout };
