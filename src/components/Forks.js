import React from 'react';


export const Forks = ({ forks }) => (
  <ul>
  {forks === undefined || forks.length === 0 ? 'You have no recent forks :(' : forks.map((item, i) => <li key={i}><a target="_blank" href={item.forkedRepoURL}>{item.forkedRepoName} </a> <a href={`https://www.github.com/${item.originalRepo}`}>Base Repo</a></li>)}
  </ul>
);
