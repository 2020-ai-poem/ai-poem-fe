import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Result from '../../components/poem/Result';
import api from '../../tools/api';

const labels = ['闲适豁达', '萧瑟惆怅', '寄情山水', '归隐山林', '飘逸洒脱', '高远清寂', '追忆故人', '感时伤春', '思乡忧老', '喟叹人生'];

const initPoem = {
  title: '',
  author: '',
  fengge: '',
  topic_index: -1,
  num: 5,
  beamSize: 0,
  // type: 'style'
};

const initError = {
  isError: false,
  content: ''
};

const Style = () => {
  const [poem, setPoem] = useState(initPoem);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(initError);
  const [success, setSuccess] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = e => {
    setError(initError);

    setPoem({
      ...poem,
      [e.target.id]: e.target.value
    });
  };

  const handleLabelChange = label => {
    setError(initError);

    setPoem({
      ...poem,
      topic_index: +label
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

    if(poem.topic_index === -1) {
      setError({
        isError: true,
        content: '诗歌没有选择风格噢！'
      });
      return;
    }

    if(!poem.title) {
      setError({
        isError: true,
        content: '标题不能为空噢！'
      });
      return;
    }

    if(poem.num === 5 && poem.fengge.length !== 5) {
      setError({
        isError: true,
        content: '言体为五言意味着你的首句需要为五个字噢！'
      });
      return;
    }

    if(poem.num === 7 && poem.fengge.length !== 7) {
      setError({
        isError: true,
        content: '言体为七言意味着你的首句需要为七个字噢！'
      });
      return;
    }

    if(!poem.author) {
      setError({
        isError: true,
        content: '诗歌还没有署名噢！'
      });
      return;
    }

    setBtnLoading(true);

    setError({
      isError: true,
      content: '正在生成诗句中，还需要等待一段时间，可以切换到其他页面，稍后可在“我的作品”中查看结果哦～'
    });

    api
      .createFengge(poem)
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

  return (
    <div className="container style">
      <div className="becca-bread">
        <Link className="becca-bread-link" to="/create">作诗</Link>
        <span className="becca-forward-slash">/</span>
        <span className="becca-bread-text">风格诗</span>
      </div>
      <div className="container becca-card">
        <h4>风格诗</h4>
        <div className="row poem-row">
          <div className="col-md-6">
            <form className="poem-form">
              <div className="form-group">
                <label htmlFor="style">选一个风格吧：{ labels[poem.topic_index] }</label>
                <div>
                  { labels.map((label, index) => (
                    <span
                      key={index}
                      className={ poem.topic_index === index? 'poem-label poem-label-active' : 'poem-label' }
                      onClick={() => handleLabelChange(index)}
                    >{ label }</span>
                  )) }
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="title">标题：</label>
                <input
                  className="form-control"
                  placeholder="给诗取一个名字吧"
                  id="title"
                  value={poem.title}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label htmlFor="description" className="mt-2">首句：</label>
                <input
                  id="fengge"
                  autoComplete="off"
                  onChange={handleChange}
                  className="form-control"
                  value={poem.fengge}
                  placeholder="给一个开头吧"
                />
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
                  disabled={btnLoading}
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
              <div>
                <Result result={result} />
                <div className="text-center mt-5">
                  <button
                    className="btn btn-dark"
                    style={{
                      background: '#870002',
                      border: 'none'
                    }}
                  >收藏</button>
                </div>
              </div>
            ) : (
              <div className="style-null null-result"></div>
            ) }

          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Style;
