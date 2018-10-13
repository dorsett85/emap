import React from 'react';

import styles from './LeftMainPanelSearch.scss';
import csrf from '../../../utils/getCsrfToken';


// Sub stateless components
const SearchResults = props => {
  if (props.searchResults === null) {return null}
  let results;
  if (!props.searchResults) {
    results = 'No matching search results'
  } else {
    let li = [];
    for (let k in props.searchResults) {
      li.push(<li key={k}>{k}: {props.searchResults[k]}</li>)
    }
    results = <ul>{li}</ul>;
  }

  return <div>{results}</div>;

};


export default class LeftMainPanelSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    };
  }

  handleInput(e) {
    this.setState({
      searchInput: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('/api/', {
      method: 'POST',
      body: 'place=' + this.state.searchInput,
      headers: {
        "content-type":"application/x-www-form-urlencoded",
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrf
      },
      credentials: 'include'
    }).then(response => {
      response.json().then(data => {
        this.props.updateSearchResults(data)
      })
    })

  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type={'text'} name='place' onInput={this.handleInput.bind(this)}/>
          <button type='submit'>Find City</button>
        </form>
        <SearchResults searchResults={this.props.searchResults}/>
      </div>
    )
  }
}