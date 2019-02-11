import React, {Component} from 'react';
import Login from './components/Login'
import UserProfile from './components/UserProfile';
import UserDashboard from './components/UserDashboard';

import { connect } from "react-redux";

class App extends Component {

  render() {
    console.log(this.props.store)
    const { user, showForm, allEvents } = this.props;
    return (
      <div>

        {showForm ? <Login /> : <UserDashboard user={user}/> }
        {allEvents.length > 0 ? <UserProfile /> : null}

      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    store: store,
    showForm: store.showForm,
    allEvents: store.allEvents,
    user: store.user
  };
}

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
