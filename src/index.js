import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable';

import App from './containers/App';
import routes from './routes';
import reducers from './reducers';
import epics from './epics';
import './assets/styles/index.scss';

// const epicMiddleware = createEpicMiddleware(epics);
// const store = createStore(reducers, initialState, applyMiddleware(epicMiddleware));
const initialState = {};
const store = createStore(reducers, initialState);
const history = syncHistoryWithStore(hashHistory, store)

const appContainer = (
  <Provider store={store}>
    <Router history={history} children={routes} />
  </Provider>
);

const appDOMNode = document.getElementById('root');

ReactDOM.render(appContainer, appDOMNode);
