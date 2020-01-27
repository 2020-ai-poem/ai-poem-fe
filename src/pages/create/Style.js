import React from 'react';
import { Link } from 'react-router-dom';

const Style = () => {
  return (
    <div className="container style">
      <div className="becca-bread">
        <Link className="becca-bread-link" to="/create">作诗</Link>
        <span className="becca-forward-slash">/</span>
        <span className="becca-bread-text">风格诗</span>
      </div>
      <div className="container becca-card">
        <h4>风格诗</h4>
      </div>
    </div>
  );
};

export default Style;
