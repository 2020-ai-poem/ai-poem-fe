import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import sha256 from 'sha256';
import api from '../../tools/api';
import '../../tools/becca.css';

const initUser = {
  email: '',
  username: '',
  password: '',
  emailCheck: ''
};

const initSuccess = {
  isSuccess: false,
  content: ''
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
  const [success, setSuccess] = useState(initSuccess);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = e => {
    setSuccess(initSuccess);
    setError(initError);
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
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
    let data = {
      email: user.email,
      username: user.username,
      password: sha256(user.password)
    };
    console.log(data);
    api
      .register(data)
      .then(res => {
        if(res.status === 200 && res.data.isOk) {
          setBtnLoading(false);
          setUser(initUser);
          setSuccess({
            isSuccess: true,
            content: '注册成功，快去登录吧'
          });

          setTimeout(() => {
            history.push('/signin');
          }, 2000);
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
    api
      .emailCheck(data)
      .then(res => {
        if(res.status === 200 && res.data.isOk) {
          setBtnDisabled(true);
          setCheckCode(res.data.number);
          setSuccess({
            isSuccess: true,
            content: '验证码已经发送到你的邮箱中去喽！'
          });
          return;
        } else if(res.status === 200 && !res.data.isOk) {
          setError({
            isError: true,
            content: '该邮箱已经注册过了噢'
          });
          return;
        }
      })
      .catch(error => {
        console.log(error);
        setError({
          isError: true,
          content: '获取验证码失败'
        });
        return;
      })
  };

  return (
    <div className="becca-container">
      <h3 className="becca-title">注册</h3>
      <hr className="becca-line"></hr>

      <div className="becca-inner-container">
        <form className="container py-4">
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
                autoComplete="off"
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
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">密码：</label>
            <input id="password" value={user.password} type="password"
              onChange={handleChange} className="form-control"
            />
          </div>

          { error.isError && <div className="alert alert-danger">{ error.content }</div> }
          { success.isSuccess && <div className="alert alert-success">{ success.content }</div> }

          <button
            className="btn btn-dark mt-3"
            onClick={handleSubmit}
          >
            { btnLoading && <span className="mr-2 spinner-grow spinner-grow-sm"></span> }
            注册
          </button>

        </form>
      </div>
    </div>
  );
};

export default Signup;
