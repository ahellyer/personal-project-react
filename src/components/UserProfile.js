import React from 'react';
import { Pulls } from './Pulls';
import { Forks } from './Forks';
import { connect } from "react-redux";
import { pullEventsTransform, forkEventsTransform } from '../helper-functions.js';

const UserProfile = (props) => {
  const forkEvents = forkEventsTransform(props.events);
  const pullRequests = pullEventsTransform(props.events);

  return (
    <div className="user-profile">
      <h2>Pull Requests</h2>
      <Pulls pulls={pullRequests} />

      <h2>Fork Events</h2>
      <Forks forks={forkEvents}/>
    </div>)
  }

const mapStateToProps = (store) => {
  return {
    events: store.allEvents
  };
}

const ConnectedUserProfile = connect(mapStateToProps)(UserProfile);

export default ConnectedUserProfile;
