import React from "react";


const SearchResults = props => {
  if (props.guessResults === null) {return null}
  let results;
  if (!props.guessResults) {
    results = 'No matching search results'
  } else {
    let li = [];
    for (let k in props.guessResults) {
      li.push(<li key={k}>{k}: {props.guessResults[k]}</li>)
    }
    results = <ul>{li}</ul>;
  }

  return <div>{results}</div>;

};

export default SearchResults;
