import React from 'react';
import { Link } from 'react-router-dom';

const JieLong = () => {
  return (
    <div className="container jielong">
      <div className="becca-bread">
        <Link className="becca-bread-link" to="/create">作诗</Link>
        <span className="becca-forward-slash">/</span>
        <span className="becca-bread-text">诗词接龙</span>
      </div>
      <div className="container becca-card">
        <h4>诗词接龙</h4>
      </div>
    </div>
  );
};

export default JieLong;
