import React, { Component } from 'react';
import { connect } from "react-redux";
import { addUserAction, addFormToggleAction, fetchUserAction, fetchEventsAction, clearErrorAction } from '../redux/actions/action-creators.js';

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
    //reset error msg?
    this.props.clearError()
    this.props.addUser(this.state.input);
    this.props.addEvents(this.state.input);
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
        {this.props.store.error.length > 0 ? <div>'Sorry, that user does not exist!'</div> : null}
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
  clearError: () => dispatch(clearErrorAction()),
  addUser:(user) => dispatch(fetchUserAction(user)),
  addEvents:(username) => dispatch(fetchEventsAction(username)),
  toggleForm: (bool) => dispatch(addFormToggleAction(bool))
})

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default ConnectedLogin;
