import React, { useState } from 'react';
import sha256 from 'sha256';
import qs from 'qs';
import api from '../../tools/api';
import './authentication.css';

const initUser = {
  email: '',
  password: ''
};

const Signin = () => {
  const [user, setUser] = useState(initUser);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let data = {
      email: user.email,
      password: sha256(user.password)
    };
    console.log(qs.stringify(data));
    api
      .login(qs.stringify(data))
      .then(res => {
        console.log(res);
      })
  };

  return (
    <div className="signin container">
      <div className="sign-title">
        <h3>登录</h3>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="info">邮箱：</label>
          <input type="email" id="email" value={user.email}
            className="form-control" onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">密码：</label>
          <input type="password" id="password" value={user.password}
            className="form-control" onChange={handleChange}
          />
        </div>

        <button className="btn btn-success">登录</button>
      </form>
    </div>
  );
};

export default Signin;
