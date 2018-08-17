import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div className="widget">
        <div className="widget__title">{this.props.title}</div>
        <pre>{this.props.data}</pre>
      </div>
    );
  }
}
