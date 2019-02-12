import React, { Component } from 'react';
import { connect } from "react-redux";
import { onUserSubmit } from '../redux/actions/action-creators.js';

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
    this.props.onUserSubmit(this.state.input);
  }

render () {
  return (
    <div className="login">
      <div className="login-wrapper">
        <h1>R<i className="fab fa-github"></i>undup</h1>
        <p>Login with your Github username to see a summary of your recent activity.</p>
        <form>
          <label>
            <span className="vh">Enter Your Github username:</span>
            <input className="user-name" placeholder="username" value={this.state.input} onChange={this.handleChange}/>
          </label>
          <input className="form-submit" type="submit" onClick={e=>this.handleSubmit(e)}/>
        </form>
        {this.props.error.length > 0 ? <div>Sorry, that user does not exist!</div> : null}
      </div>
    </div>
  )
}
}

const mapStateToProps = (store) => {
  return {
    error: store.error
  };
}

const mapDispatchToProps = (dispatch) => ({
  onUserSubmit: (input) => dispatch(onUserSubmit(input))
})

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default ConnectedLogin;
