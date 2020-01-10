import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Signin from '../pages/authentication/Signin';
import Signup from '../pages/authentication/Signup';
import Home from '../pages/home/Home';
import Profile from '../pages/profile/Profile';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile/:id" component={Profile} />
    </Switch>
  );
};

export default Router;
