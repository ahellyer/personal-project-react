import React, { Component} from 'react';
import { connect } from "react-redux";
import { fetchForkBaseAction } from '../redux/actions/action-creators.js';

class IndividualFork extends Component {
  

  componentDidMount =() => {
    console.log(this.props.item.forkedRepoFetchURL);
    //dispatch call based on fork url
    this.props.fetchForkBase(this.props.item.forkedRepoFetchURL);
    }
  render () {
    return (
      <li>
        <h3><a href={this.props.item.forkedRepoURL}>{this.props.item.forkedRepoName} <i className="fas fa-external-link-alt"></i></a></h3>
        {this.props.forkBase.filter((item) => item.id === this.props.item.id
        ).map((item, i) => <a key={i} className="base-repo" href={item.source.html_url}> Base Repo: {item.source.html_url} </a>)}
      </li>
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
