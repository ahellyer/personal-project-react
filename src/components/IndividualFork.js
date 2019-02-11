import React, { Component} from 'react';
import { connect } from "react-redux";
import { fetchForkBaseAction } from '../redux/actions/action-creators.js';

class IndividualFork extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount =() => {
    console.log(this.props.item.forkedRepoFetchURL);
    //dispatch call based on fork url
    this.props.fetchForkBase(this.props.item.forkedRepoFetchURL);
    }
  render () {
    return (
      <div>
        <h1>{this.props.item.forkedRepoName}</h1>
        {this.props.forkBase.filter((item) => item.id === this.props.item.id
        ).map((item) => <p> Base Repo: {item.source.html_url} </p>)}
      </div>
      )
}
}

const mapStateToProps = (store) => {
  return {
    forkBase: store.forkBase,
    store: store
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchForkBase: (url) => dispatch(fetchForkBaseAction(url))
})

const ConnectedIndividualFork = connect(mapStateToProps, mapDispatchToProps)(IndividualFork);

export default ConnectedIndividualFork;
