import React from 'react';
import { Link } from 'react-router-dom';
import './create.css';

const CreatePoem = () => {
  return (
    <div className="crate-poem container">
      <h3>创作：</h3>
      <div className="row">
        <div className="col-sm-3">
          <Link to='/self-create'>自</Link>
          <p className="detail-text">自由作诗</p>
        </div>
      </div>

    </div>
  );
};

export default CreatePoem;
