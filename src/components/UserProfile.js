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

//Each of the pull requests should display the title of the pull request as a link, and link to that pull request.

//Each of the pull requests should have, in addition, a visual indicator for whether it is open, closed or merged. This could be colour coded, or just have the status in words next to it.

//each of the pull requests shou
