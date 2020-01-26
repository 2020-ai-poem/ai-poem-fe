import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Signin from '../pages/authentication/Signin';
import Signup from '../pages/authentication/Signup';
import CangTou from '../pages/create/CangTou';
import CreatePoem from '../pages/create/CreatePoem';
import Emotion from '../pages/create/Emotion';
import JieLong from '../pages/create/JieLong';
import SelfCreate from '../pages/create/SelfCreate';
import Style from '../pages/create/Style';
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
      <Route path="/cangtou" component={CangTou} />
      <Route path="/create" component={CreatePoem} />
      <Route path="/emotion" component={Emotion} />
      <Route path="/jielong" component={JieLong} />
      <Route path="/self-create" component={SelfCreate} />
      <Route path="/style" component={Style} />
      <Route path="/my-collection" component={MyCollection} />
      <Route path="/my-work" component={MyWork} />
      <Route path="/profile/:id" component={Profile} />
    </Switch>
  );
};

export default Router;
