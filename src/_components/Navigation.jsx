import React from 'react';
import { Link } from 'react-router-dom';

/**
 * This is currently a just a 
 */

/**
 * Render a nested hierarchy of route configs with unknown depth/breadth
 */
const Navigation = function displayRouteMenu(routes) {
  /**
   * Render a single route as a list item link to the config's pathname
   */
  function singleRoute(route) {
    return (
      <li key={route.key} className="nav-item">
        <Link to={route.path} className="nav-link">
          {route.key}
        </Link>
      </li>
    );
  }

  // loop through the array of routes and generate an unordered list
  return (
    <ul className="nav flex-column">
      {routes.map(route => {
        // if this route has sub-routes, then show the ROOT as a list item and recursively render a nested list of route links
        if (route.routes) {
          return (
            <React.Fragment key={route.key}>
              {singleRoute(route)}
              {displayRouteMenu(route.routes)}
            </React.Fragment>
          );
        }

        // no nested routes, so just render a single route
        return singleRoute(route);
      })}
    </ul>
  );
}

export { Navigation };