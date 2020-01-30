import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

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


const SelfCreate = () => {
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

  const handleGenerate = e => {
    e.preventDefault();
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
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, [2000]);
    }, [2000]);
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

              { success && (
                <div className="alert alert-success mt-4">
                  生成成功！
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
                            <div key={index} className="result-poem">{ item }</div>
                          )) }
                      </div>
                    </div>
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
