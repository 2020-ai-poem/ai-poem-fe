import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Result from '../../components/poem/Result';

const initPoem = {
  title: '无题',
  author: '',
  emotion: '',
  type: 'emotion',
  num: 5,
  kind: 1
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

const Emotion = () => {
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

    if(!poem.emotion || !poem.author) {
      setError({
        isError: true,
        content: '诗词不完整噢！'
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
                <label htmlFor="emotion">现在心情如何？</label>
                <input
                  id="emotion"
                  autoComplete="off"
                  value={poem.emotion}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="用一句话或几个词来表达一下你的心情"
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
