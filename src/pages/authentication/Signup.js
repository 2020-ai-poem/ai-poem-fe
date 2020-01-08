import React, { useState } from 'react';
import sha256 from 'sha256';
import qs from 'qs';
import api from '../../tools/api';
import './authentication.css';

const initUser = {
  email: '',
  username: '',
  password: '',
  emailCheck: ''
};

const initError = {
  isError: false,
  content: ''
};

const Signup = () => {
  const [user, setUser] = useState(initUser);
  const [error, setError] = useState(initError);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = e => {
    setError(initError);
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(user);
  };

  const emailCheck = e => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className="signup container">
      <div className="sign-title">
        <h3>注册</h3>
      </div>

      <form className="form-container">
        <div className="form-gruop mb-3">
          <label htmlFor="email">邮箱：</label>
          <input id="email" value={user.email} type="email"
            className="form-control" onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailCheck">验证码：</label>
          <div className="input-group">
            <input id="emailCheck" value={user.emailCheck} type="text"
              className="form-control" onChange={handleChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                onClick={emailCheck}
              >获取验证码</button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="username">用户名：</label>
          <input id="username" value={user.username} type="text"
            onChange={handleChange} className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">密码：</label>
          <input id="password" value={user.password} type="password"
            onChange={handleChange} className="form-control"
          />
        </div>

        <button className="btn btn-dark" onClick={handleSubmit}>注册</button>

      </form>
    </div>
  );
};

export default Signup;
