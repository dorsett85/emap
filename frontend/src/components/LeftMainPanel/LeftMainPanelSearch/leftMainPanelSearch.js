import React from 'react';

import styles from './LeftMainPanelSearch.scss';
import csrf from '../../../utils/getCsrfToken';


export default class LeftMainPanelSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
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
    })
    .then(response => {
      response.json().then(data => {
        this.setState({
          searchRequest: data
        })
      })
    });

  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <form>
          <input type={'text'} name='place' onInput={this.handleInput}/>
          <button type='submit' onClick={this.handleClick}>
            Post Request
          </button>
        </form>
        <div>
          {this.state.searchRequest}
        </div>
      </div>
    )
  }
}