import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import api from '../../tools/api';
import '../../tools/becca.css';

const initInfo = {
  age: '...',
  email: '...',
  userId: 0,
  sex: 'X',
  birthDate: 'xxxx-xx-xx',
  userName: 'username'
};

const Profile = (props) => {
  const { user } = useContext(UserContext);
  const [info, setInfo] = useState(initInfo);

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
          setInfo({
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


  return (
    <div className="becca-container">
      <h3 className="becca-title">个人信息</h3>
      <hr className="becca-line"></hr>

      <div className="becca-inner-container">

      </div>
    </div>
  );
};

export default Profile;
