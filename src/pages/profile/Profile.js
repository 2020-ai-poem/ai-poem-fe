import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
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

const initError = {
  isError: false,
  content: ''
};

const initSuccess = {
  isSuccess: false,
  content: ''
};

const Profile = (props) => {
  const history = useHistory();
  const { user, update } = useContext(UserContext);

  const [formInfo, setFormInfo] = useState(initInfo);
  const [info, setInfo] = useState(initInfo);
  const [modifyInfo, setModifyInfo] = useState({});
  const [getInfo, setGetInfo] = useState(false);
  const [error, setError] = useState(initError);
  const [success, setSuccess] = useState(initSuccess);

  useEffect(() => {
    let data = {
      userId: props.match.params.id
    };
    api
      .getInfo(data)
      .then(res => {
        if(res.status === 200 && !res.data.isOk) {
          history.push('/signin');
        } else if(res.status === 200 && res.data.isOk) {
          setInfo({
            age: !res.data.age ? 0 : res.data.age,
            email: res.data.email,
            userId: res.data.userId,
            sex: !res.data.sex ? '未知' : res.data.sex,
            username: res.data.userName
          });
        }
      })
  }, [props, history, getInfo]);

  useEffect(() => {
    setFormInfo(info);
    update(info);
  }, [info, update]);

  const handleChange = e => {
    setError(initError);
    setSuccess(initSuccess);

    setFormInfo({
      ...formInfo,
      [e.target.id]: e.target.value
    });
    setModifyInfo({
      ...modifyInfo,
      [e.target.id]: e.target.value
    });
  };

  const changeInfo = () => {
    if(formInfo === info) {
      setError({
        isError: true,
        content: '没有更改任何信息噢！'
      });
      return;
    }
    if(formInfo.age < 0) {
      setError({
        isError: true,
        content: '年龄不能小于0噢!'
      });
      return;
    }
    if(modifyInfo.age) {
      modifyInfo.age = parseInt(modifyInfo.age)
    }
    api
      .modifyInfo(modifyInfo)
      .then(res => {
        if(res.status === 200 && res.data.isOk) {
          setSuccess({
            isSuccess: true,
            content: '修改成功'
          });
          setGetInfo(!getInfo);

          setTimeout(() => {
            setSuccess(initSuccess);
          }, [2000]);
        } else if(res.status === 200 && !res.data.isOk) {
          setError({
            isError: true,
            content: res.data.errmsg
          });
        }
      })
      .catch(error => {
        setError({
          isError: true,
          content: '修改信息失败'
        });
      })
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
                    <option value="女">女</option>
                    <option value="男">男</option>
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
              { error.isError && (
                <div className="alert alert-warning">{ error.content }</div>
              ) }
              { success.isSuccess && (
                <div className="alert alert-success">{ success.content }</div>
              ) }
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-outline-secondary"
                data-dismiss="modal"
                onClick={() => { setFormInfo(info); setModifyInfo({});}}
              >取消</button>
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
