import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const [user, setUser] = useState(initUser);
  const [error, setError] = useState(initError);
  const [checkCode, setCheckCode] = useState('');
  const [success, setSuccess] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = e => {
    setError(initError);
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    console.log(user);
    if(!user.email || !user.emailCheck || !user.username || !user.password) {
      setError({
        isError: true,
        content: "请将信息填写完整"
      });
      return;
    }
    if(user.emailCheck !== checkCode) {
      setError({
        isError: true,
        content: '邮箱验证码不正确'
      });
      return;
    }
    setBtnLoading(true);
    user.password = sha256(user.password);
    
    api
      .register(qs.stringify(user))
      .then(res => {
        console.log(res);
        if(res.status === 200 && res.data.isOk) {
          setBtnLoading(false);
          setSuccess(true);
          setUser(initUser);

          setTimeout(() => {
            history.push('/signin');
          }, 1000);
          return;
        }

        if(res.status === 200 && !res.data.isOk) {
          setBtnLoading(false);
          setError({
            isError: true,
            content: '该用户名已经注册过了噢'
          });
          return;

        } else {
          setBtnLoading(false);
          setError({
            isError: true,
            content: '注册失败'
          });
          return;
        }
      })
      .catch(error => {
        setBtnLoading(false);
        setError({
          isError: true,
          content: '注册失败'
        });
        return;
      })
  };

  const emailCheck = e => {
    e.preventDefault();
    if(!user.email) {
      setError({
        isError: true,
        content: '请填写邮箱！'
      });
      return;
    }
    let data = {
      email: user.email
    };
    console.log(qs.stringify(data));
    api
      .emailCheck(data)
      .then(res => {
        if(res.status === 200 && res.data.isOk) {
          setBtnDisabled(true);
          setCheckCode(res.data.number);
        };
      })
      .catch(error => {
        console.log(error);
      })
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
          <label htmlFor="emailCheck">邮箱验证码：</label>
          <div className="input-group">
            <input id="emailCheck" value={user.emailCheck} type="text"
              className="form-control" onChange={handleChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                disabled={btnDisabled}
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

        { error.isError && <div className="alert alert-danger">{ error.content }</div> }
        { success && <div className="alert alert-success">注册成功，快去登录吧</div> }

        <button className="btn btn-dark" onClick={handleSubmit}>
          { btnLoading && <span className="mr-2 spinner-grow spinner-grow-sm"></span> }
          注册
        </button>

      </form>
    </div>
  );
};

export default Signup;
