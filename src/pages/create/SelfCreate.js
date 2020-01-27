import React from 'react';
import { Link } from 'react-router-dom';

const SelfCreate = () => {
  return (
    <div className="container self-create">
      <div className="becca-bread">
        <Link className="becca-bread-link" to="/create">作诗</Link>
        <span className="becca-forward-slash">/</span>
        <span className="becca-bread-text">自由作诗</span>
      </div>
      <div className="container becca-card">
        <h4>自由作诗</h4>
      </div>
    </div>
  );
};

export default SelfCreate;
