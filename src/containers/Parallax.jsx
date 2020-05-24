import React, { Component } from "react";
import { Parallax } from "react-materialize";
import PropTypes from "prop-types";

export default class _ extends Component {
  render() {
    return (
      <Parallax image={<img alt="" src={this.props.imagen} width="25" />} />
    );
  }
}

_.propTypes = {
  imagen: PropTypes.string.isRequired,
};
