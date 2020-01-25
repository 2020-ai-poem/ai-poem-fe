import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import api from '../../tools/api';
import './profile.css';
import '../../tools/becca.css';

const initInfo = {
  age: 0,
  email: '',
  userId: 0,
  sex: '',
  userName: ''
};

const Profile = (props) => {
  const { user, update } = useContext(UserContext);
  const [formInfo, setFormInfo] = useState(initInfo);
  const [info, setInfo] = useState(initInfo);

  console.log(formInfo);

  useEffect(() => {
    let data = {
      userId: props.match.params.id
    };
    api
      .getInfo(data)
      .then(res => {
        if(res.status === 200 && !res.data.isOk) {
          // not login
          console.log(res.data);
        } else if(res.status === 200 && res.data.isOk) {
          console.log(res.data);
          setInfo({
            age: !res.data.age ? 0 : res.data.age,
            email: res.data.email,
            userId: res.data.userId,
            sex: !res.data.sex ? '未知' : res.data.sex,
            username: res.data.userName
          });
        }
      })
  }, [props]);

  useEffect(() => {
    setFormInfo(info);
  }, [info]);

  const changeInfo = () => {
    console.log('changed.');
  };

  const handleChange = e => {
    setFormInfo({
      ...formInfo,
      [e.target.id]: e.target.value
    });
  };


  return (
    <div className="becca-container">

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">更改信息</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="username">用户名:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={formInfo.username || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sex">性别:</label>
                  <select
                    type="text"
                    className="form-control"
                    id="sex"
                    value={formInfo.sex || ''}
                    onChange={handleChange}
                  >
                  <option value="未知">未知</option>
                  <option value="f">女</option>
                  <option value="m">男</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="age">年龄:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    value={formInfo.age}
                    onChange={handleChange}
                  />
                </div>

              </form>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button className="btn btn-secondary" onClick={changeInfo}>确认修改</button>
            </div>

          </div>
        </div>
      </div>

      <h3 className="becca-title">个人信息</h3>
      <hr className="becca-line"></hr>

      <div className="becca-inner-container pb-4">
        <div className="info-container">
          <p>用户名：{ info.username }</p>
          <p>邮箱：{ info.email }</p>
          <p>性别：{ info.sex }</p>
          <p>年龄：{ info.age }</p>
        </div>

        { user && user.userId === info.userId && (
          <div className="change-info-btn">
            <button
              className="btn btn-outline-dark"
              data-toggle="modal"
              data-target="#exampleModal"
            >修改信息</button>
          </div>
        ) }

      </div>
    </div>
  );
};

export default Profile;
