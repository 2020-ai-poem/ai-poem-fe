import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const labels = ['喜悦', '乐观', '萧瑟凄凉', '忆旧', '孤寂惆怅', '烦恼', '思乡忧老', '渺远孤逸'];

const initPoem = {
  title: '无题',
  author: '',
  description: '',
  style: '',
  num: 5,
  kind: 1,
  type: 'style'
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
      style: label
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
    console.log(poem);
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
                <label htmlFor="style">选一个风格吧：{ poem.style }</label>
                <div>
                  { labels.map((label, index) => (
                    <span
                      key={index}
                      className={ poem.style === label? 'poem-label poem-label-active' : 'poem-label' }
                      onClick={() => handleLabelChange(label)}
                    >{ label }</span>
                  )) }
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">描述：</label>
                <input
                  id="description"
                  autoComplete="off"
                  onChange={handleChange}
                  className="form-control"
                  value={poem.description}
                  placeholder="一句话，段落，或关键词"
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
          <div className="col-md-6">result</div>
        </div>
      </div>
    </div>
  );
};

export default Style;
