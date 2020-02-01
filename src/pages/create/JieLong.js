import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initPoem = {
  num: 5,
  kind: 1,
  title: '',
  jielong: '',
  author: '',
  type: 'jielong'
};

const initError = {
  isError: false,
  content: ''
};

const resultPoem = {
  title: '春望',
  author: '杜甫',
  content: '国破山河在，城春草木深。感时花溅泪，恨别鸟惊心。烽火连三月，家书抵万金。白头搔更短，浑欲不胜簪。'
};

const JieLong = () => {
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

  const handleKindChange = e => {
    setError(initError);

    setPoem({
      ...poem,
      kind: parseInt(e.target.value)
    });
  };

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

    console.log(poem);

    setBtnLoading(true);

    let newContent = resultPoem.content.split('。');
    for(let i = 0; i < newContent.length; i++) {
      if(!newContent[i]) continue;
      newContent[i] += '。'
    }

    let data = resultPoem;
    data.content = newContent;

    setTimeout(() => {
      setSuccess(true);
      setBtnLoading(false);
      setResult(data);

      setTimeout(() => {
        setSuccess(false);
      }, [2000]);

    }, [2000]);
    console.log(data);

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
                <div className='mt-2'>
                  类型：
                  <input
                    type="radio"
                    checked={poem.kind === 1}
                    value="1"
                    onChange={handleKindChange}
                    className="mr-2 becca-radio"
                  />绝句
                  <input
                    type="radio"
                    checked={poem.kind === 2}
                    value="2"
                    onChange={handleKindChange}
                    className="ml-4 mr-2 becca-radio"
                  />律诗
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
                <div>
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
                            { result.content.length && result.content.map((item, index) => {
                              if(index === 0) {
                                return (
                                  <div key={index} className="result-poem jielong-poem">{ item }</div>
                                );
                              } else {
                                return (
                                  <div key={index} className="result-poem">{ item }</div>
                                );
                              }
                            }) }
                        </div>
                      </div>
                    </div>
                  </div>
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
