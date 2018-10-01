import React from 'react';

import styles from './LeftMainPanelSearch.scss';


export default class LeftMainPanelSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    const text = e.target.value;
    this.changeSearchText(text);
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
      </div>
    )
  }
}