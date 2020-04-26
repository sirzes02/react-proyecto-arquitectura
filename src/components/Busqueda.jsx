import React, { Component } from "react";

export default class _ extends Component {
  render() {
    return (
      <div className="Busqueda">{console.log(this.props.location.state)}</div>
    );
  }
}
