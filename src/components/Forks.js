import React from 'react';


export const Forks = (props) => (
  <ul>
  {props.forks === undefined || props.forks.length === 0 ? 'You have no recent forks :(' : props.forks.map((item, i) => <li key={i}><a target="_blank" href={item.forkedRepoURL}>{item.forkedRepoName} </a> <a href={`https://www.github.com/${item.originalRepo.name}`}>Base Repo</a></li>)}
  </ul>
);
