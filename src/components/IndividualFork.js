import React, { Component} from 'react';
import { connect } from "react-redux";
import { fetchForkBaseAction } from '../redux/actions/action-creators.js';

class IndividualFork extends Component {
  filterFork = forks => forks.filter(fork => fork.id === this.props.item.id);

  componentDidMount =() => {
    this.props.fetchForkBase(this.props.item.forkedRepoFetchURL);
    }

  render () {
    const filteredForks = this.filterFork(this.props.forkBase);

    return (
      <li>
        <h3>
          <a href={this.props.item.forkedRepoURL}>{this.props.item.forkedRepoName} <i className="fas fa-external-link-alt"></i>
          </a>
        </h3>
        {filteredForks.map((item, i) => <a key={i} className="base-repo" href={item.source.html_url}> Base Repo: {item.source.html_url} </a>)}
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
