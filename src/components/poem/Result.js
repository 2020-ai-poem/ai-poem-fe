import React from 'react';

const Result = ({ result }) => {
  return (
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
  );
};

export default Result;
