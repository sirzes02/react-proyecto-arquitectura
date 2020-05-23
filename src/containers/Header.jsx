import React, { Component } from "react";
import { Icon, Navbar, NavItem } from "react-materialize";
import { Link } from "react-router-dom";
import M from "materialize-css";
import fondo from "../assets/fondo.jpg";
import "../css/Header.css";

export default class _ extends Component {
  componentDidMount() {
    M.Sidenav.init(document.querySelector("#slide-out"), {});
  }

  render() {
    return (
      <div className="Header">
        <Navbar
          alignLinks="left"
          brand={
            <Link
              to="/"
              className="brand-logo right"
              style={{ paddingRight: 20 }}
            >
              Busqueda de videojuegos
            </Link>
          }
        >
          <NavItem
            data-target="slide-out"
            className="sidenav-trigger show-on-large"
          >
            <Icon>menu</Icon>
          </NavItem>
        </Navbar>

        <ul id="slide-out" className="sidenav">
          <li>
            <div className="user-view">
              <div className="background">
                <img src={fondo} alt="Fondo" />
              </div>
              <span style={{ paddingTop: 90 }} className="black-text name">
                Página Web para la busqueda de videojuegos.
              </span>
              <span className="black-text email" style={{ marginTop: "2%" }}>
                Esta página cuenta con la posibilidad de encontrar videojuegos
                con palabras claves que conpongan la historia o un personaje de
                un videojuego.
                <br />
                <br />
                <br />
                <i>
                  Santiago Varela Mejía
                  <br />
                  Juan José Castro
                </i>
                <br />
              </span>
            </div>
          </li>
          <li>
            <div className="container">
              <span className="black-text">
                ¿Es usted <Link to="/rutaAdministrador">Administrador</Link>?
              </span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
