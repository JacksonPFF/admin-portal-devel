// import React from "react";
// import { Route, Switch, Redirect } from "react-router-dom";
// import { HomePage } from "../HomePage";
// import { LoginPage } from "../LoginPage";
// import { SidebarLayout } from "../_components";

export const topics = [
  {
    name: 'React Router',
    id: 'react-router',
    description: 'Declarative, component based routing for React',
    resources: [
      {
        name: 'URL Parameters',
        id: 'url-parameters',
        description: "URL parameters are parameters whose values are set dynamically in a page's URL. This allows a route to render the same component while passing that component the dynamic portion of the URL so it can change based off of it.",
        url: 'https://tylermcginnis.com/react-router-url-parameters/'
      },
      {
        name: 'Programmatically navigate',
        id: 'programmatically-navigate',
        description: "When building an app with React Router, eventually you'll run into the question of navigating programmatically. The goal of this post is to break down the correct approaches to programmatically navigating with React Router.",
        url: 'https://tylermcginnis.com/react-router-programmatically-navigate/'
      }
    ]
  },
  {
    name: 'React.js',
    id: 'reactjs',
    description: 'A JavaScript library for building user interfaces',
    resources: [
      {
        name: 'React Lifecycle Events',
        id: 'react-lifecycle',
        description: "React Lifecycle events allow you to tie into specific phases of a component's life cycle",
        url: 'https://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js/'
      },
      {
        name: 'React AHA Moments',
        id: 'react-aha',
        description: "A collection of 'Aha' moments while learning React.",
        url: 'https://tylermcginnis.com/react-aha-moments/'
      }
    ]
  },
  {
    name: 'Functional Programming',
    id: 'functional-programming',
    description: 'In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.',
    resources: [
      {
        name: 'Imperative vs Declarative programming',
        id: 'imperative-declarative',
        description: 'A guide to understanding the difference between Imperative and Declarative programming.',
        url: 'https://tylermcginnis.com/imperative-vs-declarative-programming/'
      },
      {
        name: 'Building User Interfaces with Pure Functions and Function Composition',
        id: 'fn-composition',
        description: 'A guide to building UI with pure functions and function composition in React',
        url: 'https://tylermcginnis.com/building-user-interfaces-with-pure-functions-and-function-composition-in-react-js/'
      }
    ]
  }
];

// const ROUTES = [
//   { path: "/", key: "LOGOUT", exact: true, component: LoginPage },
//   {
//     path: "/app",
//     key: "HOMEPAGE",
//     component: props => {
//       if (!localStorage.getItem("user")) {
//         alert("You need to log in to access app routes");
//         return <Redirect to={"/"} />;
//       }
//       return <RenderRoutes {...props} />;
//     },
//     routes: [
//       {
//         path: "/app",
//         key: "APP_ROOT",
//         exact: true,
//         component: SidebarLayout,
//       },
//       {
//         path: "/app/page",
//         key: "APP_PAGE",
//         exact: true,
//         component: () => <h1>App Page</h1>,
//       },
//     ],
//   },
// ];

// function RouteWithSubRoutes(route) {
//   return (
//     <Route
//       path={route.path}
//       exact={route.exact}
//       render={props => <route.component {...props} routes={route.routes} />}
//     />
//   );
// }

// /**
//  * Use this component for any new section of routes 
//  * (any config object that has a "routes" property)
//  */
// export function RenderRoutes({ routes }) {
//   return (
//     <Switch>
//       {routes.map((route, i) => {
//         return <RouteWithSubRoutes key={route.key} {...route} />;
//       })}
//       <Route component={() => <h1>Not Found!</h1>} />
//     </Switch>
//   );
// }

// export const routeData = {
//   topics,
//   ROUTES,
//   RenderRoutes,
// };
