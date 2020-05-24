import React, { Component } from "react";
import { Icon, Navbar } from "react-materialize";
import { Link } from "react-router-dom";
import M from "materialize-css";
import "../css/Header.css";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = { juego: "" };
  }

  componentDidMount() {
    M.Sidenav.init(document.querySelector("#slide-out"), {});
    this.actualizarJuego();
  }

  actualizarJuego = () =>
    fetch("http://localhost:4000/games/ultimojuego")
      .then((res) => res.json())
      .then((data) => this.setState({ juego: data }))
      .catch((err) => console.log(err));

  render() {
    return (
      <div className="Header">
        <Navbar
          alignLinks="right"
          brand={
            <Link to="/">
              Búsqueda de videojuegos<Icon>videogame_asset</Icon>
            </Link>
          }
        >
          <Link to="/">
            <Icon>search</Icon>
          </Link>

          <Link
            to={{
              pathname: "/busqueda",
              state: { tipo: 2 },
            }}
          >
            <Icon>view_module</Icon>
          </Link>
        </Navbar>
      </div>
    );
  }
}
