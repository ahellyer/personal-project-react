import React from 'react';

export const Pulls = ({ pulls }) => (
  <ul>
  {pulls === undefined || pulls.length === 0 ? 'No Recent Pull Events' : pulls.map((item, i) => <li key={i}><a href={item.pullURL}>{item.pullTitle} - </a><span>{item.status}</span></li>)}
  </ul>
);
