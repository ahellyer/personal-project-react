import React, { Component } from 'react';
import { connect } from "react-redux";
import { addUserAction, addPullsAction, addForksAction, addFormToggleAction } from '../redux/actions/action-creators.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      showError: false
    }
  };

  //on change update internal state
  handleChange = (e) => {
    const input = e.target.value
    this.setState({ input })
  }

  //on submit send state to app.js
   handleSubmit = (e) => {
    e.preventDefault()

    this.getUserInfo(this.state.input);
    //dispatch user
  }

  //general error handler function
  handleErrors = (response) => {
    if (!response.ok) {
        this.setState({showError: true})
        throw Error(response.statusText);

    }
    return response;
  }

  //function for events endpoint
  getData = (username) => {
    const url = `https://api.github.com/users/${username}/events`;
    fetch(url).then(this.handleErrors)
      .then(function(response) {
      return response.json();
    })
    .then(res => {
      if (res.length === 0) {
        this.setState({showError: true})
      } else {
        const results = res
        this.setState({showError: false})
        this.updateForks2(results);
        this.updatePulls(res);
        this.props.toggleForm(false);
      }
    }).catch(function(error) {
        console.log(error);
    });
  }

  //call users endpoint and get more info about the user:
  getUserInfo = (username) => {
    console.log('getUserInfo was called!')
    const url = `https://api.github.com/users/${username}?access_token=f3cecb9e1ebf49bba2ded16cc6ad972474c21698`;
    fetch(url).then(this.handleErrors)
      .then(function(response) {
      return response.json();
    })
    .then(res => {
      //call updatePulls
      console.log(res)
      if (res.length === 0) {
        this.setState({showError: true})
      } else {
        this.setState({showError: false})
        const user = {
          avatar: res.avatar_url,
          bio: res.bio,
          name: res.name,
          location: res.location,
          login: res.login
        }
        //add user info to state
        this.props.addUser(user);
        //get user forks and pulls
        this.getData(this.state.input);
      }
    }).catch(function(error) {
        console.log(error);
    });
  }

  // updateForks = (apiResponse) => {
  //   console.log('apiResonse value', apiResponse);
  //   const forkEvents =
  //       apiResponse.filter((item) => item.type==="ForkEvent" ).map((item) => (
  //             {type: item.type,
  //             actor: item.actor,
  //             originalRepo: item.repo,
  //             forkedRepoURL: item.payload.forkee.html_url,
  //             forkedRepoName: item.payload.forkee.name}
  //             ))
  //     console.log(forkEvents);
  //     //send up to app.js
  //     this.props.onUserSubmit(forkEvents, "forkEvents")
  // }

  //make call for each fork and get data from that call:
  updateForks2 = (apiResponse) => {
    const forkEventURLS =
        apiResponse.filter((item) => item.type==="ForkEvent" )
        .map((item) => item.payload.forkee.url);
    Promise.all(forkEventURLS.map(u=>fetch(u))).then(responses =>
    Promise.all(responses.map(res => res.json()))
    )
    .then(results => {
      const forkEvents = results.map((item) => (
            {type: 'ForkEvent',
            originalRepo: item.source.full_name,
            forkedRepoURL: item.html_url,
            forkedRepoName: item.name}
            ))
      this.props.addForks(forkEvents)
    })
  }

  updatePulls = (apiResponse) => {
    const pullRequests =
apiResponse.filter((item) => item.type==="PullRequestEvent" ).map((item, i) => (
      {type: item.type,
       actor: item.actor,
       repo: item.repo,
       pullTitle: item.payload.pull_request.title,
       pullURL: item.payload.pull_request.html_url,
       status: item.payload.pull_request.state,
       merged: item.payload.pull_request.merged}
      ))
      this.props.addPulls(pullRequests);
  }

render () {
  return (
    <div>
        <form>
          <label>
            Enter Your Github username:
            <input value={this.state.input} onChange={this.handleChange}/>
          </label>
          <input type="submit" onClick={e=>this.handleSubmit(e)}/>
        </form>
        {this.state.showError ? <div>'Sorry, that user does not exist!'</div> : null}
    </div>
  )
}
}

const mapStateToProps = (store) => {
  return {
    store: store
  };
}

const mapDispatchToProps = (dispatch) => ({
  addUser:(user) => dispatch(addUserAction(user)),
  addPulls:(pulls) => dispatch(addPullsAction(pulls)),
  addForks:(forks) => dispatch(addForksAction(forks)),
  toggleForm: (bool) => dispatch(addFormToggleAction(bool))
})

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default ConnectedLogin;
