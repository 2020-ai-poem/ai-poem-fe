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
      </div>
    </div>
  );
};

export default CangTou;
