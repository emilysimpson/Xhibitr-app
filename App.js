import React from "react";

import Navigation from "./navigation";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Navigation />
      </React.Fragment>
    );
  }
}
