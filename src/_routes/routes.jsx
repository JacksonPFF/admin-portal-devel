import React from 'react';
import { HomePage } from '../HomePage';

// This is the static config where we define
// all links and routes that appear in the sidebar
export const routes = [
  {
    path: '',
    exact: true,
    name: 'Home',
    component: () => <HomePage />,
  },
  {
    path: '/placeholder_1',
    name: 'placeholder_1',
    component: () => <h2>placeholder_1</h2>,
  },
  {
    path: '/placeholder_2',
    name: 'placeholder_2',
    component: () => <h2>placeholder_2</h2>,
  },
];
