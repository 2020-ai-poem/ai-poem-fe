import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Result from '../../components/poem/Result';
import { imageryArray } from '../../tools/imageryArray';
import api from '../../tools/api';

const initPoem = {
  title: '无题',
  author: '',
  yixiang: '',
  num: 5,
  beamSize: 0
};

const initError = {
  isError: false,
  content: ''
};

const Emotion = () => {
  const [poem, setPoem] = useState(initPoem);
  const [labels, setLabels] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(initError);
  const [success, setSuccess] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const getRandomLabels = () => {
    const array = [];

    for(let i = 0; i < 15; i++) {
      let index = Math.floor(Math.random() * imageryArray.length);
      array.push(imageryArray[index]);
    }

    setLabels([...array]);
  }

  useEffect(() => {
    getRandomLabels();
  }, []);

  const handleLabelChange = label => {
    setError(initError);

    const temp = poem.yixiang.split(',');

    let tempStr = "";
    // 此时点击的 label 是否在原有的意向中
    // 若在，需要删除
    // 若不在，需要添加
    let flag =false;

    for(let i = 0; i < temp.length; i++) {
      if(temp[i] === label) {
        flag = true;
        temp.splice(i, 1);
      }
    }

    if(temp.length >= 3 && !flag) {
      return;
    }

    if(!flag) {
      temp.push(label);
    }

    for(let i = 0; i < temp.length; i++) {
      if(!temp[i]) continue;
      if(i !== temp.length - 1) {
        tempStr += temp[i] + ",";
      } else {
        tempStr += temp[i];
      }
    }

    setPoem({
      ...poem,
      yixiang: tempStr
    });
  };


  const handleChange = e => {
    setError(initError);

    setPoem({
      ...poem,
      [e.target.id]: e.target.value
    });
  };

  const handleNumChange = e => {
    setError(initError);

    setPoem({
      ...poem,
      num: parseInt(e.target.value)
    });
  };

  const handleBeamSizeChange = e => {
    setPoem({
      ...poem,
      beamSize: +e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    setResult(null);

    if(!poem.yixiang || !poem.author) {
      setError({
        isError: true,
        content: '诗词不完整噢！'
      });
      return;
    }

    console.log(poem);
    setBtnLoading(true);

    setError({
      isError: true,
      content: '正在生成诗句中，还需要等待一段时间，可以切换到其他页面，稍后可在“我的作品”中查看结果哦～'
    });

    api
      .createYixiang(poem)
      .then(res => {
        setError(initError);
        if(res.status === 200 && res.data.isOk) {
          let newContent = [];
          newContent = res.data.poem.split(/，|。/);
          for(let i = 0; i < newContent.length; i++) {
            if(!newContent[i]) continue;
            if(i % 2) {
              newContent[i] += '。';
            } else {
              newContent[i] += '，';
            }
          }

          let data = {
            author: poem.author,
            title: poem.title,
            content: newContent
          };

          setBtnLoading(false);
          setResult(data);
          setSuccess(true);

          setTimeout(() => {
            setSuccess(false);
          }, [2000]);
        } else {
          setBtnLoading(false);
          setError({
            isError: true,
            content: res.data.errmsg
          });
          setTimeout(() => {
            setError(initError);
          }, 2000);
        }
      })
      .catch(error => {
        console.log(error);
        setBtnLoading(false);
        setError({
          isError: true,
          content: '服务器出错'
        });
        setTimeout(() => {
          setError(initError);
        }, 2000);
      })

  };

  const isLabelIn = label => {
    if(poem.yixiang.search(label) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="container emotion">
      <div className="becca-bread">
        <Link className="becca-bread-link" to="/create">作诗</Link>
        <span className="becca-forward-slash">/</span>
        <span className="becca-bread-text">情感诗</span>
      </div>
      <div className="container becca-card">
        <h4>情感诗</h4>
        <div className="row poem-row">
          <div className="col-md-6">
            <form className="poem-form">
              <div className="form-group">
                <label htmlFor="style">选 1 ~ 3 个意向吧：{ poem.yixiang }</label>
                <div
                  className="change-btn"
                  onClick={getRandomLabels}
                >换一批</div>
                <div>
                  { labels.map((label, index) => (
                    <span
                      key={index}
                      className={ isLabelIn(label) ? 'poem-label poem-label-active' : 'poem-label' }
                      onClick={() => handleLabelChange(label)}
                    >{ label }</span>
                  )) }
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="author">署名：</label>
                <input
                  id="author"
                  autoComplete="off"
                  value={poem.author}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="留下你的大名"
                />
              </div>
              <div className="mt-3">
                言体：
                <input
                  type="radio"
                  checked={poem.num === 5}
                  value="5"
                  onChange={handleNumChange}
                  className="mr-2 becca-radio"
                />五言
                <input
                  type="radio"
                  checked={poem.num === 7}
                  value="7"
                  onChange={handleNumChange}
                  className="ml-4 mr-2 becca-radio"
                />七言
              </div>

              <div className="mt-2">
                <label>beamSize：</label>
                <select
                  className="custom-select"
                  id="beamSize"
                  value={poem.beamSize}
                  onChange={handleBeamSizeChange}
                >
                  <option value="0">选择...</option>
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
                <p className="mt-2">算法中搜索宽度的大小，该值越大，诗词生成的时间也就越长，但是诗词内容效果会更好。</p>
              </div>

              { error.isError && (
                <div className="alert alert-warning mt-4">
                { error.content }
                </div>
              ) }

              { success && (
                <div className="alert alert-success mt-4">
                  生成成功！
                </div>
              ) }

              <div className="poem-btn">
                <button
                  className="btn btn-light"
                  onClick={handleSubmit}
                >
                  { btnLoading && (
                    <span className="mr-2 spinner-grow spinner-grow-sm"></span>
                  ) }
                  生成
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="result-container">

              { result ? (
                <Result result={result} />
              ) : (
                <div className="emotion-null null-result"></div>
              ) }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emotion;
