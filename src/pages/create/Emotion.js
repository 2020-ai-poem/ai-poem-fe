import React from 'react';
import { Link } from 'react-router-dom';

const Emotion = () => {
  return (
    <div className="container emotion">
      <div className="becca-bread">
        <Link className="becca-bread-link" to="/create">作诗</Link>
        <span className="becca-forward-slash">/</span>
        <span className="becca-bread-text">情感诗</span>
      </div>
      <div className="container becca-card">
        <h4>情感诗</h4>
      </div>
    </div>
  );
};

export default Emotion;
