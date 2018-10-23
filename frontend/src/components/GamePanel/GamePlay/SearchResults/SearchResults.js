import React from "react";


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

export default SearchResults;