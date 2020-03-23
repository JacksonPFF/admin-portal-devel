import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, history } from './_helpers';
import { App } from './App';
import { Router } from "react-router-dom";

const store = configureStore();

render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('app')
);