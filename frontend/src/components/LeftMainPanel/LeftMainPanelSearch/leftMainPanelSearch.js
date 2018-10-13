import React from 'react';

import styles from './LeftMainPanelSearch.scss';
import csrf from '../../../utils/getCsrfToken';


// Sub stateless components
const SearchResults = props => {
  if (!props.searchResults) {return null}
  let results;
  if (typeof props.searchResults === 'string') {
    results = props.searchResults
  } else {
    const li = props.searchResults.map((v, i) => <li key={i}>{v[0]}: {v[1]}</li>);
    results = <ul>{li}</ul>;
  }

  return <div>{results}</div>;

};


export default class LeftMainPanelSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      searchResults: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInput(e) {
    this.setState({
      searchInput: e.target.value
    })
  }

  handleClick(e) {
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
        this.setState({
          searchResults: data
        })
      })
    })

  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <form>
          <input type={'text'} name='place' onInput={this.handleInput}/>
          <button type='submit' onClick={this.handleClick}>Find City</button>
        </form>
        <SearchResults searchResults={this.state.searchResults}/>
      </div>
    )
  }
}