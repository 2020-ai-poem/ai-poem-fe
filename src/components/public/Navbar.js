import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './public.css';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-dark" style={{ backgroundColor: '#1b5745' }}>
      <Link to="/" className="navbar-brand h3">AI Poem</Link>
      <div>
        { user === null ? (
          <span>
            <Link to="/signup" className="btn btn-outline-light mr-2">注册</Link>
            <Link to="/signin" className="btn btn-outline-light">登录</Link>
          </span>
        ) : (
          <span className="dropdown">
            <button className="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              { user.username }
            </button>
            <div className="dropdown-menu dropdown-menu-right mt-3" aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to={`/profile/id`}>个人信息</Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="/my-collection">我的收藏</Link>
              <Link className="dropdown-item" to="/my-work">我的作品</Link>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item" onClick={handleLogout}>退出登录</div>
            </div>
          </span>
        ) }
      </div>
    </nav>
  );
};

export default Navbar;
