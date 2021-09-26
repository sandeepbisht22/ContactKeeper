import React, { Fragment } from "react";
import spinner from "../../resources/gifs/spinner.gif";

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt="loading..."
      style={{ width: "200px", margin: "auto", display: "block" }}
    ></img>
  </Fragment>
);

export default Spinner;
