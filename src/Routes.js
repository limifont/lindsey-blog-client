import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Admin from './containers/Admin';
import Login from './containers/Login';
import NewPost from './containers/NewPost';
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute"

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path='/' exact component={Home} props={childProps} />
    <AppliedRoute path='/login' exact component={Login} props={childProps} />
    <AppliedRoute path='/admin' exact component={Admin} props={childProps} />
    <AppliedRoute path='/admin/posts/new' exact component={NewPost} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;