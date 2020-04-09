import React, { Component } from "react";
import { Parallax as Effect } from "react-materialize";
import PropTypes from "prop-types";

export default class Parallax extends Component {
  render() {
    return (
      <div className="Parallax">
        <Effect
          image={<img alt="" src={this.props.imagen} width="25" />}
          options={{
            responsiveThreshold: 0
          }}
        />
      </div>
    );
  }
}

Parallax.propTypes = {
  imagen: PropTypes.string.isRequired
};
