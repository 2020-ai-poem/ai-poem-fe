import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const initPoem = {
  num: 5,
  kind: 1,
  content: ''
};

const resultPoem = {
  content: [
    '新月发白日，一杯一春歇。',
    '年累形易照，如遂出方舟。',
    '快竿吹噪绚，山坂与鸿旖。',
    '乐宴云时掩，吴鱼闭紫薇。'
  ],
  title: '无题'
};

const CangTou = () => {
  const [poem, setPoem] = useState(initPoem);
  const [result, setResult] = useState({});

  const handleChange = e => {
    setPoem({
      ...poem,
      [e.target.id]: e.target.value
    });
  };

  const handleNumChange = e => {
    setPoem({
      ...poem,
      num: parseInt(e.target.value)
    });
  };

  const handleKindChange = e => {
    setPoem({
      ...poem,
      kind: parseInt(e.target.value)
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(poem);
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
              <label htmlFor="content">藏头：</label>
                <input
                  className="form-control"
                  placeholder="四字（如：新年快乐）"
                  id="content"
                  value={poem.content}
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
                    className="mr-2"
                  />五言
                  <input
                    type="radio"
                    checked={poem.num === 7}
                    value="7"
                    onChange={handleNumChange}
                    className="ml-4 mr-2"
                  />七言
                </div>
                <div className='mt-2'>
                  类型：
                  <input
                    type="radio"
                    checked={poem.kind === 1}
                    value="1"
                    onChange={handleKindChange}
                    className="mr-2"
                  />绝句
                  <input
                    type="radio"
                    checked={poem.kind === 2}
                    value="2"
                    onChange={handleKindChange}
                    className="ml-4 mr-2"
                  />律诗
                </div>

                <div className="cangtou-btn">
                  <button
                    className="btn btn-light"
                    onClick={handleSubmit}
                  >生成</button>
                </div>
              </div>
            </form>
          </div>
          <div className='col-md-6'>
            <div className="result-container">
              <div className="result">
                <div className='row'>

                  <div className='col-3'>
                    <div className="result-author-container">
                      <span className="result-author">徐霜玉</span>
                      <span className="result-stamp">印</span>
                    </div>
                  </div>

                  <div className="col-9">
                    <div className="result-poem-container">
                      <div className="result-poem-title">{ resultPoem.title }</div>
                      { resultPoem.content.length && resultPoem.content.map((result, index) => (
                        <div key={index} className="result-poem">{ result }</div>
                      )) }
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CangTou;
