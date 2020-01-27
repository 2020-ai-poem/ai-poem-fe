import React from 'react';
import { useHistory } from 'react-router-dom';
import './create.css';

const CreatePoem = () => {
  const history = useHistory();

  return (
    <div className="create-poem container">
      <div className="becca-bread">
        <span className="becca-bread-text">作诗</span>
      </div>
      <div className="container becca-card">

        <h4>辅助作诗（AI作诗）：</h4>
        <div className="row mt-4">
          <div className="col-sm-3">
            <div className="circle-container">
              <div className="cangtou-img circle-text" onClick={() => history.push('/cangtou')}></div>
              <p className="circle-detail-text">藏头诗</p>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="circle-container">
              <div className="emotion-img circle-text" onClick={() => history.push('/emotion')}></div>
              <p className="circle-detail-text">情感诗</p>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="circle-container">
              <div className="style-img circle-text" onClick={() => history.push('/style')}></div>
              <p className="circle-detail-text">风格诗</p>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="circle-container">
              <div className="jielong-img circle-text" onClick={() => history.push('/jielong')}></div>
              <p className="circle-detail-text">诗词接龙</p>
            </div>
          </div>
        </div>

        <h4 className="mt-5">创作（自主作诗）：</h4>
        <div className="row mt-4">
          <div className="col-sm-3">
            <div className="circle-container">
              <div className="self-create-img circle-text" onClick={() => history.push('/self-create')}></div>
              <p className="circle-detail-text">自由作诗</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreatePoem;
