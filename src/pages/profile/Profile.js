import React, { useState, useEffect } from 'react';
import api from '../../tools/api';
import './profile.css';

const initUser = {
  age: '...',
  email: '...',
  userId: 0,
  sex: 'X',
  birthDate: 'xxxx-xx-xx',
  userName: 'username'
};

const initError = {
  isError: false,
  content: ''
};

const initSuccess = {
  isSuccess: false,
  content: ''
};

const Profile = (props) => {
  const [user, setUser] = useState(initUser);
  const [form, setForm] = useState({});
  const [checkCode, setCheckCode] = useState(null);
  const [error, setError] = useState(initError);
  const [success, setSuccess] = useState(initSuccess);
  const [emailCheckBtn, setEmailCheckBtn] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    let data = {
      userId: props.match.params.id
    };
    api
      .getInfo(data)
      .then(res => {
        console.log(res);
        if(res.status === 200 && !res.data.isOk) {
          // not login
          console.log(res.data);
        } else if(res.status === 200 && res.data.isOk) {
          setUser({
            age: !res.data.age ? '0' : res.data.age,
            email: res.data.email,
            userId: res.data.userId,
            sex: !res.data.sex ? 'unknown' : res.data.sex,
            birthDate: res.data.birthDate,
            userName: res.data.userName
          });
        }
      })
  }, [props]);

  const handleChange = e => {
    if(e.target.id === 'email') {
      setEmailCheckBtn(false);
    } else {
      setEmailCheckBtn(true);
    }

    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(form);
  };

  const emailCheck = e => {
    e.preventDefault();
    let data = {
      email: user.email
    };
    api
      .emailCheck(data)
      .then(res => {
        if(res.status === 200 && res.data.isOk) {
          setEmailCheckBtn(true);
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
    <div className="profile container mt-5">
      <h3 className="title">个人信息</h3>
      <hr className="line"></hr>

      <div className="profile-container">
        <form className="container py-4">
          <div className="form-group">
            <label htmlFor="username">用户名：</label>
            <input
              type="text" value={user.userName} className="form-control"
              onChange={handleChange} id="userName"
            />
          </div>

          <label htmlFor="email">邮箱：</label>
          <div className="input-group mb-3">
            <input
              type="text" value={user.email} className="form-control"
              onChange={handleChange} id="email"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                disabled={emailCheckBtn}
                onClick={emailCheck}
              >获取验证码</button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="sex">性别：</label>
            <select
              className="form-control" id="sex" value={user.sex}
              onChange={handleChange}
            >
              <option value="unknown">未知</option>
              <option value="f">女</option>
              <option value="m">男</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="age">年龄：</label>
            <input
              type="text" value={user.age} className="form-control"
              onChange={handleChange} id="age"
            />
          </div>

          <button
            className="btn btn-dark" onClick={handleSubmit}
            style={{ backgroundColor: '#801336', border: 'none' }}
          >修改信息</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
