import React, { Component } from 'react';
import githubEvents from './events.js';

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
    console.log(this.state.input)
  }
  //on submit send state to app.js
   handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.input)
    //call function that makes API call
    this.getData(this.state.input);
    //checkif user exists?
    //dispatch all data to the store?
  }

  handleErrors = (response) => {
    if (!response.ok) {
      // console.log('there was a problem!!')
        throw Error(response.statusText);
        this.setState({showError: true})
    }
    return response;
  }

  //function to make fetch
  getData = (username) => {
    const url = `https://api.github.com/users/${username}/events?access_token=a7b8080e5076d4834dff9c7f03bdce00d0ad0f94`;
    fetch(url).then(this.handleErrors)
      .then(function(response) {
      return response.json();
    })
    .then(res => {
      //call updatePulls
      console.log(res)
      if (res.length === 0) {
        console.log('there are no results to display')
        this.setState({showError: true})
      } else {
        const results = res
        this.setState({showError: false})
        this.updateForks(results);
        this.updatePulls(res);
        this.props.toggleForm();
        this.props.addUser(res[0].actor.avatar_url, res[0].actor.display_login);

      }

    }).catch(function(error) {
        console.log(error);
        // alert('there was an issue with your submission!')
    });
    console.log(username);

  }

  updateForks = (apiResponse) => {
    console.log('apiResonse value', apiResponse);
    const forkEvents =
        apiResponse.filter((item) => item.type==="ForkEvent" ).map((item) => (
              {type: item.type,
              actor: item.actor,
              originalRepo: item.repo,
              forkedRepoURL: item.payload.forkee.html_url,
              forkedRepoName: item.payload.forkee.name}
              ))
      console.log(forkEvents);
      //send up to app.js
      this.props.onUserSubmit(forkEvents, "forkEvents")
  }

  updatePulls = (apiResponse) => {
    const pullRequests =
apiResponse.filter((item) => item.type==="PullRequestEvent" ).map((item, i) => (
      {type: item.type,
       actor: item.actor,
       repo: item.repo,
       pullTitle: item.payload.pull_request.title,
       pullURL: item.payload.pull_request.html_url,
       status: item.payload.pull_request.state}
      ))

      console.log(pullRequests)
      //send up to app.js
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
        {this.state.showError ? 'oopsie poopsie! looks like there was an error with your submission' : null}
    </div>
  )
}


}

export default Login;
