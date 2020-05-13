import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { UIContext } from '../../contexts/UIContext';
import Result from '../../components/poem/Result';
import api from '../../tools/api';
import './work.min.css';

const initData = {
  likes: [],
  comments: [],
  createTime: ""
}

const Work = (props) => {
  const { user } = useContext(UserContext);
  const { toggleDimmer, toggleText } = useContext(UIContext);
  const id = props.match.params.id;
  const [result, setResult] = useState(null);
  const [data, setData] = useState(initData);
  const [comment, setComment] = useState("");

  const getData = () => {
    toggleDimmer(true);

    const data0 = {
      poemId: +id
    }

    api
      .getPoem(data0)
      .then(res => {
        toggleDimmer(false);

        if(res.status === 200) {
          let newContent = res.data.poem[0].content.split('。');
          for(let i = 0; i < newContent.length; i++) {
            if(!newContent[i]) continue;
            newContent[i] += '。'
          }
          let data1 = {
            author: res.data.poem[0].author,
            title: res.data.poem[0].title,
            content: newContent
          };
          setResult(data1);
          setData(res.data.poem[0]);
        }
      })
      .catch(error => {
        toggleDimmer(false);
        console.log(error);
      })
  }

  useEffect(() => {
    getData();
  }, []);

  const handleInputChange = (e) => {
    setComment(e.target.value);
  }

  const spliceTime = (time) => {
    return time.substr(1, time.length - 2);
  }

  const isLiked = () => {
    for(let i = 0; i < data.likes.length; i++) {
      if(data.likes[i] === user.userId) {
        return true;
      }
    }
    return false;
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

  const handleLike = () => {
    toggleDimmer(true);

    const data0 = {
      poemId: data.poemId
    }

    api
      .like(data0)
      .then(res => {
        toggleDimmer(false);
        if(res.status === 200) {
          setData({
            ...data,
            likes: res.data.likes
          });
        }
      })
      .catch(error => {
        toggleDimmer(false);
        console.log(error);
      })
  }

  const handleCollect = () => {
    toggleDimmer(true);

    const data0 = {
      poemId: data.poemId
    }

    api
      .addCollection(data0)
      .then(res => {
        toggleDimmer(false);

        if(res.status === 200) {
          if(res.data.code === 0) {
            toggleText({
              isText: true,
              content: "收藏成功"
            });
          } else if(res.data.code === 1) {
            toggleText({
              isText: true,
              content: "收藏失败，已经收藏过了～"
            });
          } else {
            toggleText({
              isText: true,
              content: "未登录"
            });
          }
        }
      })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    toggleDimmer(true);

    const data1 = {
      content: comment,
      poemId: data.poemId
    }

    api
      .createComment(data1)
      .then(res => {
        toggleDimmer(false);
        if(res.status === 200) {
          if(res.data.code === 0) {
            setComment("");
            getData();
            toggleText({
              isText: true,
              content: "评论成功"
            });
          } else if(res.data.code === 1) {
            toggleText({
              isText: true,
              content: "评论失败"
            });
          } else {
            toggleText({
              isText: true,
              content: "未登录"
            });
          }
        }
      })
      .catch(error => {
        toggleDimmer(false);
        console.log(error);
      })
  }

  return (
    <div className="work my-container">
      <div className="my-poem">
        { result ? (
          <Result result={result} />
        ) : null }
        <div className="btn-group">
          { isLiked() ? (
            <button
              className="like-btn"
              onClick={handleLike}
            >取消点赞（{ data.likes.length }）</button>
          ) : (
            <button
              className="like-btn"
              onClick={handleLike}
            >点赞（{ data.likes.length }）</button>
          ) }
          <button
            className="collect-btn"
            onClick={handleCollect}
          >收藏作品</button>
        </div>
      </div>
      <div className="comment-container">
        <h1>评论 / 留言 · { transferType(data.type) }</h1>

        <div className="info-box">
          <p><span>作者：</span>{ data.author }</p>
          <p><span>创建时间：</span>{ spliceTime(data.createTime) }</p>
        </div>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="comment-input"
            placeholder="写下你的评论吧～"
            value={comment}
            onChange={handleInputChange}
          />
          <button
            className="btn btn-light submit-btn"
            onClick={handleFormSubmit}
          >提交评论</button>
        </form>

        <div className="comments">
          { data.comments.length ? (
              data.comments.map((item, index) => (
                <div className="comment" key={index}>
                  <h2>
                    { item.username }
                    { item.userId === data.userId ? (
                      <span>（创建者）</span>
                    ) : null}
                  </h2>
                  <p className="content">{ item.content }</p>
                  <p className="time">{ spliceTime(item.createTime) }</p>
                </div>
              ))
          ) : (
            <div className="empty-text">暂无评论，做第一个评论的人吧！</div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default Work;
