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

const Profile = (props) => {
  const [user, setUser] = useState(initUser);
  const [form, setForm] = useState({});
  const [data, setData] = useState({});

  console.log(user);

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
            sex: !res.data.sex ? 'X' : res.data.sex,
            birthDate: res.data.birthDate,
            userName: res.data.userName
          });
        }
      })

  }, [props]);

  const handleChange = e => {
    console.log(e.target.id);
  }

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

          <div className="form-group">
            <label htmlFor="email">邮箱：</label>
            <input
              type="text" value={user.email} className="form-control"
              onChange={handleChange} id="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sex">性别：</label>
            <input
              type="text" value={user.sex} className="form-control"
              onChange={handleChange} id="sex"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">年龄：</label>
            <input
              type="text" value={user.age} className="form-control"
              onChange={handleChange} id="age"
            />
          </div>

          <button className="btn btn-success">修改信息</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
