import React, { Component } from "react";
import { Parallax } from "react-materialize";
import PropTypes from "prop-types";

export default class _ extends Component {
  render() {
    return (
      <div className="Parallax">
        <Parallax image={<img alt="" src={this.props.imagen} width="25" />} />
      </div>
    );
  }
}

_.propTypes = {
  imagen: PropTypes.string.isRequired
};
