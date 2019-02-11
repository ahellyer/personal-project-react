import React from 'react';

export const Pulls = ({ pulls }) => (
  <ul className="main-list">
  {pulls === undefined || pulls.length === 0 ? <p><i className="fas fa-exclamation-circle"></i> No Recent Pull Requests</p> : pulls.map((item, i) => <li key={i}><span className={`pull-status ${item.status}`}>{item.status} {item.merged ? <img className="merged" src={require('./../merge.png')} alt="merge symbol"/> : null}</span><a href={item.pullURL}>{item.pullTitle}</a></li>)}
  </ul>
);
