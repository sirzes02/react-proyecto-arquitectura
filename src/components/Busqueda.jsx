import React, { Component } from "react";

export default class _ extends Component {
  constructor(props) {
    super(props);

    this.state = { juegos: [] };
  }

  componentDidMount() {
    fetch(
      `http://localhost:4000/games/buscarTipo${this.props.location.state.tipo}`,
      {
        method: "POST",
        body: JSON.stringify(this.props.location.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => this.setState({ juegos: data }))
      .catch((err) => console.error(err));
  }

  render() {
    return <div className="Busqueda"></div>;
  }
}
