import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UIContext } from '../../contexts/UIContext';
import api from '../../tools/api';
import './home.min.css';

const Home = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const { toggleDimmer } = useContext(UIContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    toggleDimmer(true);
    api
      .getPoems()
      .then(res => {
        toggleDimmer(false);
        if(res.status === 200) {
          setData(res.data.poems)
        }
      })
      .catch (error => {
        toggleDimmer(false);
        console.log(error);
      })
  }

  const spliceContent = (content) => {
    return content.substr(0, 20) + "...";
  }

  const spliceTime = (time) => {
    return time.substr(1, time.length - 2);
  }

  const transferType = (type) => {
    if(type === 'yixiang') {
      return '意向诗';
    } else if(type === 'cangtou') {
      return '藏头诗';
    } else if(type === 'jielong') {
      return '诗词接龙';
    } else if(type === 'selfCreate') {
      return '自由创作';
    } else {
      return '风格诗';
    }
  }

  const goToDetail = (id) => {
    history.push(`/work/${id}`);
  }

  return (
    <div className="my-work my-container">
      <div className="design-red"></div>
      <h1>AI诗呆 · 创作广场</h1>

      <div className="works">
        { data.length ? (
          data.map((item, index) => (
            <div
              className="work-container"
              key={index}
            >
              <div className="work-index">{ index + 1 }</div>
              <h2>{ item.title }</h2>
              <p
                className="content"
                onClick={() => goToDetail(item.poemId) }
              >{ spliceContent(item.content) }</p>
              <p className="time">{ spliceTime(item.createTime) }</p>
              <div className="type">{ transferType(item.type) }</div>
            </div>
          ))
        ) : (
          <p className="empty-text">暂无作品</p>
        ) }
      </div>
    </div>
  );
};

export default Home;
