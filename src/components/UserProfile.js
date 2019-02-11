import React, { Component} from 'react';
import { Pulls } from './Pulls';
import { Forks } from './Forks';
import { connect } from "react-redux";
import { addPullsAction, addForksAction } from '../redux/actions/action-creators.js';

class UserProfile extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    console.log(this.props.events)
    //filter fork events:
    const forkEvents =
          this.props.events.filter((item) => item.type==="ForkEvent" ).map((item, i) => (
                {type: item.type,
                id: item.payload.forkee.id,
                actor: item.actor,
                originalRepo: item.repo,
                forkedRepoURL: item.payload.forkee.html_url,
                forkedRepoFetchURL: item.payload.forkee.url,
                forkedRepoName: item.payload.forkee.name}
                ))

    const pullRequests =
      this.props.events.filter((item) => item.type==="PullRequestEvent" ).map((item, i) => (
      {type: item.type,
       actor: item.actor,
       repo: item.repo,
       pullTitle: item.payload.pull_request.title,
       pullURL: item.payload.pull_request.html_url,
       status: item.payload.pull_request.state,
       merged: item.payload.pull_request.merged}
      ))

    return (<div>
      <h2>Pull Requests</h2>
      <Pulls pulls={pullRequests} />

      <h2>Fork Events</h2>
      <Forks forks={forkEvents} />

    </div>)
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.user.login,
    events: store.allEvents
  };
}

const ConnectedUserProfile = connect(mapStateToProps)(UserProfile);

export default ConnectedUserProfile;
