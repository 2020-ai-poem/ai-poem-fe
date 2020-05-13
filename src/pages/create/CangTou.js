import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../tools/api';

const initPoem = {
  num: 5,
  beamSize: 0,
  title: '',
  cangtou: '',
  author: '',
  type: 'cangtou'
};

const initError = {
  isError: false,
  content: ''
};

const isChinese = (str) => {
  if (/^[\u4e00-\u9fa5]+$/.test(str)) {
    return true;
  } else {
    return false;
  }
};

const CangTou = () => {
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

    if(!poem.title) {
      setError({
        isError: true,
        content: '标题不能为空噢！'
      });
      return;
    }

    if(!poem.cangtou) {
      setError({
        isError: true,
        content: '藏头不能为空噢！'
      });
      return;
    }

    if(!isChinese(poem.cangtou)) {
      setError({
        isError: true,
        content: '藏头需要是中文噢！'
      });
      return;
    }

    if(poem.cangtou.length !== 4) {
      setError({
        isError: true,
        content: '藏头长度需为四噢！'
      });
      return;
    }

    if(!poem.author) {
      setError({
        isError: true,
        content: '请留下诗的署名噢！'
      });
      return;
    }

    setBtnLoading(true);

    setError({
      isError: true,
      content: '正在生成诗句中，还需要等待一段时间，可以切换到其他页面，稍后可在“我的作品”中查看结果哦～'
    });

    api
      .createCangtou(poem)
      .then(res => {
        setError(initError);
        if(res.status === 200 && res.data.isOk) {

          let newContent = [];

          // format for cangtou
          // if(poem.kind === 2) {
          //   newContent = res.data.poem.split('。');
          //   for(let i = 0; i < newContent.length; i++) {
          //     if(!newContent[i]) continue;
          //     newContent[i] += '。'
          //   }
          // }

          // if(poem.kind === 1) {
          //   newContent = res.data.poem.split(/，|。/);
          //   for(let i = 0; i < newContent.length; i++) {
          //     if(!newContent[i]) continue;
          //     if(i % 2) {
          //       newContent[i] += '。';
          //     } else {
          //       newContent[i] += '，';
          //     }
          //   }
          // }

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
    <div className="container cangtou">
      <div className="becca-bread">
        <Link className="becca-bread-link" to="/create">作诗</Link>
        <span className="becca-forward-slash">/</span>
        <span className="becca-bread-text">藏头诗</span>
      </div>
      <div className="container becca-card">
        <h4>藏头诗</h4>
        <div className="row poem-row">
          <div className="col-md-6">
            <form className="poem-form">
              <div className="form-group">
                <label htmlFor="content">标题：</label>
                <input
                  className="form-control"
                  placeholder="给诗取一个名字吧"
                  id="title"
                  value={poem.title}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label htmlFor="content" className="mt-3">藏头：</label>
                <input
                  className="form-control"
                  placeholder="四字（如：新年快乐）"
                  id="cangtou"
                  value={poem.cangtou}
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
              </div>
            </form>
          </div>
          <div className='col-md-6'>
            <div className="result-container">

              { result ? (
                <div className="result">
                  <div className='row'>
                    <div className='col-3'>
                      <div className="result-author-container">
                        <span className="result-author">{ result.author }</span>
                        <span className="result-stamp">印</span>
                      </div>
                    </div>

                    <div className="col-9">
                      <div className="result-poem-container">
                        <div className="result-poem-title">{ result.title }</div>
                          { result.content.length && result.content.map((item, index) => (
                            <div key={index} className="result-poem cangtou-poem">{ item }</div>
                          )) }
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="cangtou-null null-result"></div>
              ) }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CangTou;
