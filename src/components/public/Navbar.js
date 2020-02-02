import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import api from '../../tools/api';
import './public.css';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    api
      .logout()
      .then(res => {
        if(res.status === 200 && res.data.isOk) {
          // logout success
          logout();
        } else {
          // logout failed
        }
      })
      .catch(error => {
        console.log(error);
        // logout failed
      })
  };

  return (
    <nav className="navbar navbar-light sticky-top becca-navbar">
      <div>
        <Link to="/" className="navbar-brand h3 mr-2">AI Poem</Link>
      </div>
      <div>
        { user === null ? (
          <span>
            <Link to="/signin" className="btn btn-outline-dark mr-2">登录</Link>
            <Link to="/signup" className="btn btn-dark">注册</Link>
          </span>
        ) : (
          <span>
            <Link to="/create" className="btn btn-outline-dark mr-2">作诗</Link>
            <span className="dropdown">
              <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                { user.username }
              </button>
              <div className="dropdown-menu dropdown-menu-right mt-3" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to={`/profile/${user.userId}`}>个人信息</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/my-collection">我的收藏</Link>
                <Link className="dropdown-item" to="/my-work">我的作品</Link>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item logout" onClick={handleLogout}>退出登录</div>
              </div>
            </span>
          </span>
        ) }
      </div>
    </nav>
  );
};

export default Navbar;
