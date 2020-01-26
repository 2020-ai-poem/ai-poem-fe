import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Signin from '../pages/authentication/Signin';
import Signup from '../pages/authentication/Signup';
import CreatePoem from '../pages/create/CreatePoem';
import SelfCreate from '../pages/create/SelfCreate';
import Home from '../pages/home/Home';
import MyCollection from '../pages/profile/MyCollection';
import MyWork from '../pages/profile/MyWork';
import Profile from '../pages/profile/Profile';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/create" component={CreatePoem} />
      <Route path="/self-create" component={SelfCreate} />
      <Route path="/my-collection" component={MyCollection} />
      <Route path="/my-work" component={MyWork} />
      <Route path="/profile/:id" component={Profile} />
    </Switch>
  );
};

export default Router;
