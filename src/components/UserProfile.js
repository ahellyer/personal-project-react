import React from 'react';
import { Pulls } from './Pulls';
import { Forks } from './Forks';

const UserProfile = (props) => {
  console.log(props)

  return <div>
    <h2>Pull Requests</h2>
    <Pulls pulls={props.pulls} />

    <h2>Fork Events </h2>
    <Forks forks={props.forks} />

  </div>
}

export default UserProfile;
