import React from 'react';

import styles from './LeftMainPanelSearch.scss';


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
    const text = e.target.value;
    this.changeSearchText(text);
  }

  handleClick() {
    fetch('/api/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include'
    })
    .then(response => {
      console.log(response.json())
    })
  }

  changeSearchText(text) {
    this.setState({
      searchInput: text
    })
  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <input type={'text'} onInput={this.handleInput}></input>
        <div>
          {this.state.searchInput}
        </div>
        <button onClick={this.handleClick}>
          Post Request
        </button>
        <div>
          {this.state.buttonClick}
        </div>
      </div>
    )
  }
}