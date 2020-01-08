import React from 'react';
import { Link } from 'react-router-dom';
import './public.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark" style={{ backgroundColor: '#db3056' }}>
      <Link to="/" className="navbar-brand h3">AI Poem</Link>
      <div>
        <Link to="/signup" className="btn btn-outline-light mr-2">注册</Link>
        <Link to="/signin" className="btn btn-outline-light">登录</Link>
      </div>
    </nav>
  );
};

export default Navbar;
