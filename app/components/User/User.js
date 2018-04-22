import React from "react";
import PropTypes from "prop-types";
import { userContainer, header } from "./styles.css";
import { errorMsg } from "sharedStyles/styles.css";
import { DuckContainer } from "containers";

User.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired
};

export default function User(props) {
  return props.noUser === true ? (
    <p className={header}>{"This user does not exist"}</p>
  ) : (
    <div>
      {props.isFetching === true ? (
        <p className={header}>{"Loading"}</p>
      ) : (
        <div>
          <div className={userContainer}>
            <div className={header}>{`${props.name}'s tweets`}</div>
          </div>
          <div>
            {props.duckIds.map(id => <DuckContainer duckId={id} key={id} />)}
            {props.duckIds.length === 0 ? (
              <p className={header}>{`It look like ${
                props.name.split(" ")[0]
              } hasn't tweeted yet`}</p>
            ) : null}
          </div>
        </div>
      )}
      {props.error ? <p className={errorMsg}>{props.error}</p> : null}
    </div>
  );
}
