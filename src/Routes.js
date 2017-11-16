import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Admin from './containers/Admin';
import Posts from './containers/Posts';
import Login from './containers/Login';
import NewPost from './containers/NewPost';
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute"
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path='/' exact component={Home} props={childProps} />
    <AppliedRoute path='/login' exact component={Login} props={childProps} />
    <AuthenticatedRoute path='/admin/posts/:id' exact component={Posts} props={childProps} />
    <AuthenticatedRoute path='/admin' exact component={Admin} props={childProps} />
    <AuthenticatedRoute path='/admin/posts/new' exact component={NewPost} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;