import React from 'react';
import IndividualFork from './IndividualFork';

export const Forks = ({ forks }) => (
  <div>
    <ul>
    {forks === undefined || forks.length === 0 ? 'No recent fork events' : forks.map((item, i) => <li><IndividualFork key={i} item={item}/></li>)}
    </ul>

  </div>
);
