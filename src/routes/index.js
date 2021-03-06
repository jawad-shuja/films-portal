import React from 'react';
import { Route } from 'react-router';

import Storage from '../lib/storage';
import App from '../containers/App';
import User from '../components/User';
import FilmList from '../containers/Film/List';
import FilmItem from '../containers/Film/Item';
import FilmUpdateForm from '../containers/Film/Actions/Update';
import FilmCreateForm from '../components/Film/Actions/Create';

function requireAuth(nextState, replace) {
  if (!Storage.getAccessToken()) {
    replace({
      pathname: '/user',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function requireNoAuth(nextState, replace) {
  if (Storage.getAccessToken()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

export default (
  <Route name="app" component={App}>
    <Route path="/" component={FilmList} onEnter={requireAuth}/>
    <Route path="/user" component={User} onEnter={requireNoAuth}/>
    <Route path="/:page" component={FilmList} onEnter={requireAuth}/>
    <Route path="/films/new" component={FilmCreateForm} onEnter={requireAuth}/>
    <Route path="/films/:id" component={FilmItem} onEnter={requireAuth}/>
    <Route path="/films/:id/edit" component={FilmUpdateForm} onEnter={requireAuth}/>
  </Route>
);
