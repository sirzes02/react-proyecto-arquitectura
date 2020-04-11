import React, { Component } from "react";
import {
  Select,
  TextInput,
  Button,
  Icon,
  Navbar,
  NavItem,
} from "react-materialize";
import { Link } from "react-router-dom";
import M from "materialize-css";
import fondo from "../assets/fondo.jpg";
import "../css/Header.css";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      genero: "",
      clasificacion: "",
      anio: "",
      dispositivo: "",
      requisitos: "",
    };
  }

  imprimir = () => {
    M.toast({ html: "I am a toast!" });
    console.log(this.state);
  };

  componentDidMount() {
    M.Sidenav.init(document.querySelector("#slide-out"), {});
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
                Usuario de pruebas
              </span>
              <span className="black-text email">
                usuario_de_pruebas@gmail.com
              </span>
            </div>
          </li>
          <li className="divider" />
          <div className="container">
            <li>
              <TextInput
                id="textinput_1_header"
                name="nombre"
                label="Nombre"
                type="text"
                value={this.state.nombre}
                onChange={this.handleChange}
              />
            </li>
            <li>
              <Select
                id="select_1_header"
                name="genero"
                label="Genero"
                value={this.state.genero}
                onChange={this.handleChange}
              >
                <option defaultValue="">-</option>
                <option value="1">Accion</option>
                <option value="2">Aventura</option>
                <option value="3">Carreras</option>
                <option value="4">Deportes</option>
                <option value="5">Rol</option>
              </Select>
            </li>
            <li>
              <Select
                id="select_2_header"
                name="clasificacion"
                label="Clasificación"
                value={this.state.clasificacion}
                onChange={this.handleChange}
              >
                <option defaultValue="">-</option>
                <option value="1">EC</option>
                <option value="2">E</option>
                <option value="3">E+10</option>
                <option value="4">T</option>
                <option value="5">M</option>
                <option value="6">AO</option>
                <option value="7">RP</option>
              </Select>
            </li>
            <li>
              <TextInput
                id="textinput_2_header"
                name="anio"
                label="Año de salida"
                type="number"
                min="1940"
                max="2020"
                maxLength="4"
                minLength="4"
                value={this.state.anio}
                onChange={this.handleChange}
              />
            </li>
            <li>
              <Select
                id="select_3_header"
                name="dispositivo"
                label="Dispositivo"
                value={this.state.dispositivo}
                onChange={this.handleChange}
              >
                <option defaultValue="">-</option>
                <option value="1">Celular</option>
                <option value="2">Computadora</option>
              </Select>
            </li>
            <li>
              <Select
                id="select_4_header"
                name="requisitos"
                label="Requisitos"
                value={this.state.requisitos}
                onChange={this.handleChange}
              >
                <option defaultValue="">-</option>
                <option value="1">Altos</option>
                <option value="2">Medios</option>
                <option value="2">Bajos</option>
              </Select>
            </li>
            <li className="center">
              <Button
                type="submit"
                waves="light"
                className="purple darken-3"
                onClick={this.imprimir}
              >
                Buscar
                <Icon right>search</Icon>
              </Button>
            </li>
          </div>
          <li style={{ paddingTop: 40, paddingBottom: 40 }}>
            <div className="divider" />
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
