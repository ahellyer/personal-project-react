import React from 'react';


export const Pulls = (props) => (
  <ul>
  {props.pulls === undefined || props.pulls.length === 0 ? 'no pulls :(' : props.pulls.map((item, i) => <li key={i}><a href={item.pullURL}>{item.pullTitle} - </a><span>{item.status}</span></li>)}
  </ul>
);
