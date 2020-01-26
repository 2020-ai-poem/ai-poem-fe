import React from 'react';
import { Link } from 'react-router-dom';
import './create.css';

const CreatePoem = () => {
  return (
    <div className="crate-poem container">
      <h3 className="mt-5">创作：</h3>
      <div className="row">
        <div className="col-sm-3">
          <div className="circle-container">
            <Link to='/self-create'>自</Link>
            <p className="detail-text">自由作诗</p>
          </div>
        </div>
      </div>

      <h3 className="mt-5">辅助（AI作诗）：</h3>
      <div className="row">
        <div className="col-sm-3">
          <div className="circle-container">
            <Link to='/cangtou'>藏</Link>
            <p className="detail-text">藏头诗</p>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="circle-container">
            <Link to='/emotion'>情</Link>
            <p className="detail-text">情感诗</p>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="circle-container">
            <Link to='/style'>风</Link>
            <p className="detail-text">风格诗</p>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="circle-container">
            <Link to='/jielong'>龙</Link>
            <p className="detail-text">诗词接龙</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoem;
