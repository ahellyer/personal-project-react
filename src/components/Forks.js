import React from 'react';
import IndividualFork from './IndividualFork';

export const Forks = ({ forks }) => (
  <div>
    <ul className="main-list">
    {forks === undefined || forks.length === 0 ? <p><i className="fas fa-exclamation-circle"></i> No Recent Fork Events</p> : forks.map((item, i) => <IndividualFork key={i} item={item}/>)}
    </ul>

  </div>
);
