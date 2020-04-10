import React, { Component } from "react";
import M from "materialize-css";
import fondo from "../assets/fondo.jpg";
import {
  Select,
  TextInput,
  Button,
  Icon,
  Navbar,
  NavItem,
} from "react-materialize";
import { Link } from "react-router-dom";
import "./css/Header.css";

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
          options={estiloNav}
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
              <br />
              <br />
              <span className="black-text name">Usuario de pruebas</span>
              <span className="black-text email">
                usuario_de_pruebas@gmail.com
              </span>
            </div>
          </li>
          <li>
            <div className="divider"></div>
          </li>
          <li>
            <div className="container">
              <div className="input-field">
                <TextInput
                  label="Nombre"
                  name="nombre"
                  type="text"
                  value={this.state.nombre}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </li>
          <li>
            <div className="container">
              <div className="input-field">
                <Select
                  multiple={false}
                  value={this.state.genero}
                  onChange={this.handleChange}
                  name="genero"
                  label="Genero"
                >
                  <option defaultValue="">-</option>
                  <option value="1">Accion</option>
                  <option value="2">Aventura</option>
                  <option value="3">Carreras</option>
                  <option value="4">Deportes</option>
                  <option value="5">Rol</option>
                </Select>
              </div>
            </div>
          </li>
          <li>
            <div className="container">
              <div className="input-field">
                <Select
                  name="clasificacion"
                  multiple={false}
                  onChange={this.handleChange}
                  options={estiloSelect}
                  value={this.state.clasificacion}
                  label="Clasificación"
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
              </div>
            </div>
          </li>
          <li>
            <div className="container">
              <div className="input-field">
                <TextInput
                  label="Año de salida"
                  name="anio"
                  type="number"
                  min="1940"
                  max="2020"
                  maxLength="4"
                  minLength="4"
                  value={this.state.anio}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </li>
          <li>
            <div className="container">
              <div className="input-field">
                <Select
                  name="dispositivo"
                  multiple={false}
                  onChange={this.handleChange}
                  options={estiloSelect}
                  value={this.state.dispositivo}
                  label="Dispositivo"
                >
                  <option defaultValue="">-</option>
                  <option value="1">Celular</option>
                  <option value="2">Computadora</option>
                </Select>
              </div>
            </div>
          </li>
          <li>
            <div className="container">
              <div className="input-field">
                <Select
                  name="requisitos"
                  multiple={false}
                  onChange={this.handleChange}
                  options={estiloSelect}
                  value={this.state.requisitos}
                  label="Requisitos"
                >
                  <option defaultValue="">-</option>
                  <option value="1">Altos</option>
                  <option value="2">Medios</option>
                  <option value="2">Bajos</option>
                </Select>
              </div>
            </div>
          </li>
          <li>
            <div className="container">
              <Button
                node="button"
                type="submit"
                waves="light"
                className="purple darken-3"
                onClick={this.imprimir}
              >
                Buscar
                <Icon right>search</Icon>
              </Button>
            </div>
          </li>
          <li>
            <br />
            <div className="divider"></div>
            <br />
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

const estiloSelect = {
  classes: "",
  dropdownOptions: {
    alignment: "left",
    autoTrigger: true,
    closeOnClick: true,
    constrainWidth: true,
    container: null,
    coverTrigger: true,
    hover: false,
    inDuration: 150,
    onCloseEnd: null,
    onCloseStart: null,
    onOpenEnd: null,
    onOpenStart: null,
    outDuration: 250,
  },
};

const estiloNav = {
  draggable: true,
  edge: "left",
  inDuration: 250,
  onCloseEnd: null,
  onCloseStart: null,
  onOpenEnd: null,
  onOpenStart: null,
  outDuration: 200,
  preventScrolling: true,
};
