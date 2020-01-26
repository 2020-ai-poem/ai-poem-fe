import React from 'react';
import { useHistory } from 'react-router-dom';
import './create.css';

const CreatePoem = () => {
  const history = useHistory();

  return (
    <div className="crate-poem container">

      <h4 className="mt-5">创作：</h4>
      <div className="row mt-4">
        <div className="col-sm-3">
          <div className="circle-container">
            <div className="circle-text" onClick={() => history.push('/self-create')}>自</div>
            <p className="circle-detail-text">自由作诗</p>
          </div>
        </div>
      </div>

      <h4 className="mt-5">辅助作诗（AI作诗）：</h4>
      <div className="row mt-4">
        <div className="col-sm-3">
          <div className="circle-container">
            <div className="circle-text" onClick={() => history.push('/cangtou')}>藏</div>
            <p className="circle-detail-text">藏头诗</p>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="circle-container">
            <div className="circle-text" onClick={() => history.push('/emotion')}>情</div>
            <p className="circle-detail-text">情感诗</p>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="circle-container">
            <div className="circle-text" onClick={() => history.push('/style')}>风</div>
            <p className="circle-detail-text">风格诗</p>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="circle-container">
            <div className="circle-text" onClick={() => history.push('/jielong')}>龙</div>
            <p className="circle-detail-text">诗词接龙</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoem;
