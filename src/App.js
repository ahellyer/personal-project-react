import React, {Component} from 'react';
import Login from './components/Login'
import UserProfile from './components/UserProfile';
import UserDashboard from './components/UserDashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      // user: {},
      showForm: true,
    };
  }

  updateData = ( data, name ) => {
    this.setState({ [name]: data})
  }

  toggleForm = () => {
    this.setState({showForm: !this.state.showForm})
  }

  addUser = (user) => {
    this.setState({user})
  }

  render() {
    return (
      <div>
        {this.state.showForm ? <Login onUserSubmit={this.updateData} toggleForm={this.toggleForm} addUser={this.addUser}/> : this.state.user ? <UserDashboard user={this.state.user}/> : 'loading'}

        { this.state.user ?
          <UserProfile pulls={this.state.pullRequests} forks={this.state.forkEvents}/> :
          null
        }
      </div>
    );
  }
}

export default App;
