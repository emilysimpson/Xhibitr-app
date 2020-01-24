import React from "react";
import Navigation from "./navigation";
import getJson from "./api";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Done once for demo
    // getJson();
  }

  render() {
    return (
      <React.Fragment>
        <Navigation />
      </React.Fragment>
    );
  }
}
