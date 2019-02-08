import React, { Component } from 'react';

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
    //make API calls for user info and events info
    this.getData(this.state.input);
    this.getUserInfo(this.state.input);
  }

  //general error handler function
  handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
        this.setState({showError: true})
    }
    return response;
  }

  //function for events endpoint
  getData = (username) => {
    const url = `https://api.github.com/users/${username}/events?access_token=0377bac047ccc37c8398a574a923de7fda196253`;
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
        this.props.toggleForm();
      }
    }).catch(function(error) {
        console.log(error);
    });
  }

  //call users endpoint and get more info about the user:
  getUserInfo = (username) => {
    console.log('getUserInfo was called!')
    const url = `https://api.github.com/users/${username}?access_token=0377bac047ccc37c8398a574a923de7fda196253`;
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
        this.props.addUser(user);
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
      this.props.onUserSubmit(forkEvents, "forkEvents")
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
      this.props.onUserSubmit(pullRequests, "pullRequests");
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

export default Login;
