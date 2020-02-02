import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './home.css';

const Home = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if(!user) {
      history.push('/signin');
    }
  }, [user]);

  return (
    <div className="home container">
      <div className="lunar-calendar">
        <div className="lunar-content">正月初九</div>
        <div className="date-time">2020年2月2日</div>
      </div>
      <h3 className="home-title">创作广场</h3>

    </div>
  );
};

export default Home;
