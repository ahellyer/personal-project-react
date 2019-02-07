import React, {Component} from 'react';
import githubEvents from './events';
import Login from './Login'
import UserProfile from './UserProfile';
import UserDashboard from './UserDashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      user: {},
      showForm: true,
      githubEventData: githubEvents
    };
  }
  //add first name, last name and username as part of login form;

  updateData = ( data, name ) => {
    console.log('update data was called!')
    this.setState({ [name]: data})
    //update showForm to false?
  }

  toggleForm = () => {
    this.setState({showForm: !this.state.showForm})
  }

  addUser = (avatar, name) => {
    console.log('adding user!')
    this.setState({user: {avatar, name}})
  }

  render() {
    return (
      <div>
        {this.state.showForm ? <Login onUserSubmit={this.updateData} toggleForm={this.toggleForm} addUser={this.addUser}/> : <UserDashboard user={this.state.user}/>}

        { this.state.pullRequests ?
          <UserProfile pulls={this.state.pullRequests} forks={this.state.forkEvents}/> :
          null

        }

      </div>
    );
  }
}

export default App;
