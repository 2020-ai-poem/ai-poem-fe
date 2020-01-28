import React from 'react';
import { Link } from 'react-router-dom';

const CangTou = () => {
  return (
    <div className="container cangtou">
      <div className="becca-bread">
        <Link className="becca-bread-link" to="/create">作诗</Link>
        <span className="becca-forward-slash">/</span>
        <span className="becca-bread-text">藏头诗</span>
      </div>
      <div className="container becca-card">
        <h4>藏头诗</h4>
        <div className="row">
          <div className="col-sm-6">
            <form className="cangtou-form">
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="偷偷告诉我你的藏头！"
                />
                <div className="cangtou-btn">
                  <button className="btn btn-light mr-3">创作七言诗</button>
                  <button className="btn btn-light">创作五言诗</button>
                </div>
              </div>
            </form>
          </div>
          <div className='col-sm-6'>
            result
          </div>
        </div>
      </div>
    </div>
  );
};

export default CangTou;
