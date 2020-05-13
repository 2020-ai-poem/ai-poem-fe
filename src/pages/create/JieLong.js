import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Result from '../../components/poem/Result';
import { UIContext } from '../../contexts/UIContext';
import api from '../../tools/api';

const initPoem = {
  num: 5,
  title: '',
  jielong: '',
  author: '',
  beamSize: 0,
  type: 'jielong'
};

const initError = {
  isError: false,
  content: ''
};

// const resultPoem = {
//   title: '春望',
//   author: '杜甫',
//   content: '国破山河在，城春草木深。感时花溅泪，恨别鸟惊心。烽火连三月，家书抵万金。白头搔更短，浑欲不胜簪。'
// };

const JieLong = () => {
  const { toggleText } = useContext(UIContext);
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

    if(!poem.title || !poem.author || !poem.jielong) {
      setError({
        isError: true,
        content: '诗词不完整噢!'
      });
      return;
    }

    if(poem.num === 5 && poem.jielong.length !== 5) {
      setError({
        isError: true,
        content: '言体为五言意味着你的首句需要为五个字噢！'
      });
      return;
    }

    if(poem.num === 7 && poem.jielong.length !== 7) {
      setError({
        isError: true,
        content: '言体为七言意味着你的首句需要为七个字噢！'
      });
      return;
    }

    setBtnLoading(true);

    setError({
      isError: true,
      content: '正在生成诗句中，还需要等待一段时间，可以切换到其他页面，稍后可在“我的作品”中查看结果哦～'
    });

    api
      .createJielong(poem)
      .then(res => {
        setError(initError);
        if(res.status === 200 && res.data.isOk) {
          let newContent = res.data.poem.split('。');
          for(let i = 0; i < newContent.length; i++) {
            if(!newContent[i]) continue;
            newContent[i] += '。'
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
          }, 2000);
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
        setBtnLoading(false);
        setError({
          isError: true,
          content: '服务器出错啦！'
        });
        setTimeout(() => {
          setError(initError);
        }, 2000);
      })
  };

  return (
    <div className="container jielong">
      <div className="becca-bread">
        <Link className="becca-bread-link" to="/create">作诗</Link>
        <span className="becca-forward-slash">/</span>
        <span className="becca-bread-text">诗词接龙</span>
      </div>
      <div className="container becca-card">
        <h4>诗词接龙</h4>
        <div className="row poem-row">
          <div className="col-md-6">
            <form className="poem-form">
              <div className="form-group">
                <label htmlFor="author">标题：</label>
                <input
                  className="form-control"
                  placeholder="给诗取个名字吧"
                  id="title"
                  value={poem.title}
                  onChange={handleChange}
                  autoComplete="off"
                />

                <label htmlFor="author" className="mt-3">署名：</label>
                <input
                  className="form-control"
                  placeholder="留下您的大名"
                  id="author"
                  value={poem.author}
                  onChange={handleChange}
                  autoComplete="off"
                />

                <label htmlFor="content" className="mt-3">首句：</label>
                <input
                  className="form-control"
                  placeholder=""
                  id="jielong"
                  value={poem.jielong}
                  onChange={handleChange}
                  autoComplete="off"
                />

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
                <Result result={result}/>
              ) : (
                <div className="jielong-null null-result"></div>
              ) }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JieLong;
