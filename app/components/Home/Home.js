import React from "react";
import PropTypes from "prop-types";
import { container, title, slogan } from "./styles.css";

export default function Home(props) {
  return (
    <div className={container}>
      <p className={title}>{"Twttr"}</p>
      <p className={slogan}>{`It's a lot like twitter, but with less vowels`}</p>
    </div>
  );
}
