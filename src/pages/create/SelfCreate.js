import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Result from '../../components/poem/Result';
import api from '../../tools/api';

const initPoem = {
  title: '',
  author: '',
  shoulian: '',
  hanlian: '',
  jinglian: '',
  weilian: ''
};

const initError = {
  isError: false,
  content: ''
};

const initPublishErr = {
  isError: false,
  content: ''
};

// const resultPoem = {
//   content: [
//     '君不见，黄河之水天上来，奔流到海不复回。',
//     '君不见，高堂明镜悲白发，朝如青丝暮成雪。',
//     '人生得意须尽欢，莫使金樽空对月。',
//     '天生我材必有用，千金散尽还复来。'
//   ],
//   title: '将进酒',
//   author: '李白'
// };


const SelfCreate = () => {
  const [poem, setPoem] = useState(initPoem);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(initError);
  const [publishErr, setPublishErr] = useState(initPublishErr);
  const [success, setSuccess] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [publishBtn, setPublishBtn] = useState(false);

  const handleChange = e => {
    setError(initError);

    setPoem({
      ...poem,
      [e.target.id]: e.target.value
    });
  };

  const handleGenerate = e => {
    e.preventDefault();
    setResult(null);

    if(!poem.title || !poem.author || !poem.shoulian) {
      setError({
        isError: true,
        content: '诗词不完整噢!'
      });
      return;
    }
    setBtnLoading(true);

    let newResult = {};
    for(let i in poem) {
      if(!poem[i]) continue;
      if(i === 'title' || i === 'author') {
        newResult[i] = poem[i];
      } else {
        let newContent = [];
        if(!newResult.content) {
          newContent.push(poem[i]);
          newResult.content = newContent;
        } else {
          newResult.content.push(poem[i]);
        }
      }
    }

    setTimeout(() => {
      setResult(newResult);
      setBtnLoading(false);
    }, [2000]);
  };

  const handlePublish = () => {
    setPublishBtn(true);

    let data = {};
    data.title = result.title;
    data.author = result.author;
    data.type = 'selfCreate';

    let newContent = '';
    for(let i = 0; i < result.content.length; i++) {
      newContent += result.content[i];
    }
    data.content = newContent;

    api
      .createSelf(data)
      .then(res => {
        if(res.status === 200 && res.data.isOk) {
          setPublishBtn(false);
          setSuccess(true);

          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        } else {
          setPublishBtn(false);
          setPublishErr({
            isError: true,
            content: res.data.errmsg
          });

          setTimeout(() => {
            setPublishErr(initPublishErr);
          }, 2000);
        }
      })
      .catch(error => {
        setPublishBtn(false);
        setPublishErr({
          isError: true,
          content: '服务器出错啦！发布失败'
        });

        setTimeout(() => {
          setPublishErr(initPublishErr);
        }, 2000);
      })
  };

  return (
    <div className="container self-create">
      <div className="becca-bread">
        <Link className="becca-bread-link" to="/create">作诗</Link>
        <span className="becca-forward-slash">/</span>
        <span className="becca-bread-text">自由作诗</span>
      </div>
      <div className="container becca-card">
        <h4>自由作诗</h4>
        <div className="row poem-row">
          <div className="col-md-6">
            <form className='poem-form'>
              <label htmlFor="poem">写下你的诗：</label>
              <input
                id="title"
                placeholder="标题"
                autoComplete="off"
                onChange={handleChange}
                className="form-control text-center"
              />
              <input
                id="author"
                placeholder="署名"
                autoComplete="off"
                onChange={handleChange}
                className="form-control mt-2 text-center"
              />
              <input
                id="shoulian"
                placeholder="首联"
                autoComplete="off"
                onChange={handleChange}
                className="form-control mt-4 text-center"
              />
              <input
                id="hanlian"
                placeholder="颔联"
                autoComplete="off"
                onChange={handleChange}
                className="form-control mt-2 text-center"
              />
              <input
                id="jinglian"
                placeholder="颈联"
                autoComplete="off"
                onChange={handleChange}
                className="form-control mt-2 text-center"
              />
              <input
                id="weilian"
                placeholder="尾联"
                autoComplete="off"
                onChange={handleChange}
                className="form-control mt-2 text-center"
              />

              { error.isError && (
                <div className="alert alert-warning mt-4">
                { error.content }
                </div>
              ) }

              <div className="poem-btn">
                <button
                  className="btn btn-light"
                  onClick={handleGenerate}
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
            <div className="result-container self-result">
              { result ? (
                <div>
                  <Result result={result} />

                  { success && (
                    <div
                      style={{ width: '300px', margin: '0 auto' }}
                      className="alert alert-success mt-4"
                    >
                      发布成功！
                    </div>
                  ) }

                  { publishErr.isError && (
                    <div
                      style={{ width: '300px', margin: '0 auto' }}
                      className="alert alert-warning mt-4"
                    >
                    { publishErr.content }
                    </div>
                  ) }

                  <div className="text-center mt-5">
                    <button
                      className="btn btn-dark"
                      style={{
                        background: '#870002',
                        border: 'none'
                      }}
                      onClick={handlePublish}
                    >
                      { publishBtn && (
                        <span className="mr-2 spinner-grow spinner-grow-sm"></span>
                      ) }
                      发布
                    </button>
                  </div>
                </div>
              ) : (
                <div className="self-null null-result"></div>
              ) }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfCreate;
