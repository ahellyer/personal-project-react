import React from 'react';

const UserProfile = (props) => {
  // let forks ="";
  // let pulls ="";
  // if (props.forks === undefined) {
  //   forks = 'no forks!'
  //   console.log('there are no forks')
  // } else if (props.forks.length === 0) {
  //   forks = 'no forks!'
  //   console.log('there are no forks')
  // } else {
  //   console.log(props.forks)
  //   forks = props.forks.map(item => <a href={item.forkedRepoURL}>{item.forkedRepoName}</a>)
  //   }

  return <div>
    <h2>Pull Requests</h2>
    {props.pulls === undefined || props.pulls.length === 0 ? 'no pulls :(' : props.pulls.map((item) => <a href={item.pullURL}>{item.pullTitle} - {item.status}</a>)}

    <h2>Fork Events </h2>
      {props.forks === undefined || props.forks.length === 0 ? 'You have no recent forks :(' : props.forks.map((item) => <p><a target="_blank" href={item.forkedRepoURL}>{item.forkedRepoName} </a> <a href={`https://www.github.com/${item.originalRepo.name}`}>Base Repo</a></p>)}

  </div>
}

export default UserProfile;

//Each of the pull requests should display the title of the pull request as a link, and link to that pull request.

//Each of the pull requests should have, in addition, a visual indicator for whether it is open, closed or merged. This could be colour coded, or just have the status in words next to it.

//each of the pull requests shou
