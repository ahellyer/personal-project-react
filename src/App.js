import React, {Component} from 'react';
import Login from './components/Login'
import UserProfile from './components/UserProfile';
import UserDashboard from './components/UserDashboard';

import { connect } from "react-redux";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     input: '',
  //     // user: {},
  //     showForm: true,
  //   };
  // }

  render() {
    console.log(this.props.store)
    return (
      <div>
        {this.props.showForm ? <Login /> : <UserDashboard user={this.props.store.user}/>}

        <UserProfile pulls={this.props.store.pullRequests} forks={this.props.store.forkEvents}/>

      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    store: store,
    showForm: store.showForm
  };
}

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
