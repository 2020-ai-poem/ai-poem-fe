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
  const [user1, setUser1] = useState(initUser);
  const [user, setUser] = useState(initUser);
  const [form, setForm] = useState({});
  const [error, setError] = useState(initError);
  const [success, setSuccess] = useState(initSuccess);
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
          setUser1({
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
    setError(initError);
    setSuccess(initSuccess);
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
    if(
      JSON.stringify(form) === "{}" ||
      JSON.stringify(user) === JSON.stringify(user1)
    ) {
      setError({
        isError: true,
        content: '没有做任何修改噢！'
      });
    return;
    }
    setBtnLoading(true);

    api
      .modifyInfo(form)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
        setBtnLoading(false);
        setError({
          isError: true,
          content: '服务器出错了，修改信息失败'
        });
      })
  };

  return (
    <div className="profile container mt-5">
      <h3 className="title">个人信息</h3>
      <hr className="line"></hr>

      <div className="profile-container">
        <form className="container py-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">用户名：</label>
            <input
              type="text" value={user.userName} className="form-control"
              onChange={handleChange} id="userName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">邮箱：</label>
            <input
              type="text" value={user.email} className="form-control"
              readOnly
            />
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

          { success.isSuccess && (
            <div className="alert alert-warning">{ success.content }</div>
          ) }
          { error.isError && (
            <div className="alert alert-danger">{ error.content }</div>
          ) }

          <button
            className="btn btn-dark" onClick={handleSubmit}
            style={{ backgroundColor: '#801336', border: 'none' }}
          >
          { btnLoading && <span className="mr-2 spinner-grow spinner-grow-sm"></span> }
          修改信息</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
