import React from "react";
import PropTypes from "prop-types";
import { header, newDuckContainer, errorMsg } from "./styles.css";
import { DuckContainer } from "containers";
import { List } from "immutable";

NewDucksAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired
};

function NewDucksAvailable({ handleClick }) {
  return (
    <div className={newDuckContainer} onClick={handleClick}>
      {"New Tweets Available"}
    </div>
  );
}

Feed.propTypes = {
  duckIds: PropTypes.instanceOf(List),
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired
};

export default function Feed(props) {
  const { isFetching, newDucksAvailable, duckIds, error, resetNewDucksAvailable } = props;
  return isFetching === true ? (
    <h1 className={header}>{"Fetching"}</h1>
  ) : (
    <div>
      {newDucksAvailable ? <NewDucksAvailable handleClick={resetNewDucksAvailable} /> : null}
      {duckIds.size <= 0 ? (
        <p className={header}>
          {"Oh no!"}
          <br /> {"It appears there are no tweets yet"}
        </p>
      ) : null}
      {duckIds.map(id => <DuckContainer key={id} duckId={id} />)}
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  );
}
