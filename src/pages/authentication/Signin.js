import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import sha256 from 'sha256';
import { UserContext } from '../../contexts/UserContext';
import api from '../../tools/api';
import './authentication.css';

const initUser = {
  info: '',
  password: ''
};

const initError = {
  isError: false,
  content: ''
};

const Signin = () => {
  const { login } = useContext(UserContext);
  const history = useHistory();

  const [user, setUser] = useState(initUser);
  const [error, setError] = useState(initError);
  const [success, setSuccess] = useState(false);
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
    if(!user.info || !user.password) {
      setError({
        isError: true,
        content: '请将信息填写完整'
      });
      return;
    }
    setBtnLoading(true);
    let data = {
      info: user.info,
      password: sha256(user.password)
    };
    console.log(data);
    api
      .login(data)
      .then(res => {
        if(res.status === 200 && !res.data.isOk) {
          setBtnLoading(false);
          setError({
            isError: true,
            content: res.data.errmsg
          });
          return;
        } else if(res.status === 200 && res.data.isOk) {
          setBtnLoading(false);
          setSuccess(true);
          console.log(res);
          let user = {
            userId: res.data.userId,
            username: res.data.userName,
            sex: res.data.sex,
            age: res.data.age,
            birthDate: res.data.brithDate,
            email: res.data.email
          };

          localStorage.setItem('token', res.data.token);

          setTimeout(() => {
            login(user);
            history.push('/');
          }, 2000);
        }
      })
      .catch(error => {
        console.log(error);
        setBtnLoading(false);
      })
  };

  return (
    <div className="signin container">
      <div className="sign-title">
        <h3>登录</h3>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="info">用户名或邮箱：</label>
          <input type="text" id="info" value={user.info}
            className="form-control" onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">密码：</label>
          <input type="password" id="password" value={user.password}
            className="form-control" onChange={handleChange}
          />
        </div>

        { error.isError && <div className="alert alert-danger" role="alert">{ error.content }</div> }
        { success && <div className="alert alert-warning">登录成功</div> }

        <button
          className="btn btn-dark"
          style={{ backgroundColor: '#801336', border: 'none' }}
        >
          { btnLoading && <span className="mr-2 spinner-grow spinner-grow-sm"></span> }
          登录
        </button>
      </form>
    </div>
  );
};

export default Signin;
