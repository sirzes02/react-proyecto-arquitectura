import React, { Component } from "react";
import {
  Range,
  TextInput,
  Select,
  Textarea,
  Tabs,
  Tab,
} from "react-materialize";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      genero: "",
      clasificacion: "",
      anio: 2000,
      dispositivo: "",
      requisitos: "",
      descripcion: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="Admin">
        <Tabs className="z-depth-1 center">
          <Tab active options={estiloTab} title="Videojuegos">
            <div className="container z-depth-1" style={{ height: 450 }}>
              <ul className="container" style={{ paddingTop: 20 }}>
                <li>
                  <TextInput
                    label="Nombre"
                    name="nombre"
                    type="text"
                    value={this.state.nombre}
                    onChange={this.handleChange}
                    xl={6}
                  />
                </li>
                <li>
                  <Select
                    multiple={false}
                    name="genero"
                    label="Genero"
                    value={this.state.genero}
                    onChange={this.handleChange}
                    xl={6}
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
                    name="clasificacion"
                    multiple={false}
                    options={estiloSelect}
                    label="Clasificación"
                    value={this.state.clasificacion}
                    onChange={this.handleChange}
                    xl={12}
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
                  <p style={{ color: "purple" }}>Año de salida</p>
                  <Range
                    max="2020"
                    min="1980"
                    name="anio"
                    value={this.state.anio}
                    onChange={this.handleChange}
                  />
                </li>
                <li>
                  <Select
                    name="dispositivo"
                    multiple={false}
                    options={estiloSelect}
                    label="Dispositivo"
                    value={this.state.dispositivo}
                    onChange={this.handleChange}
                    xl={6}
                  >
                    <option defaultValue="">-</option>
                    <option value="1">Celular</option>
                    <option value="2">Computadora</option>
                  </Select>
                </li>
                <li>
                  <Select
                    name="requisitos"
                    multiple={false}
                    options={estiloSelect}
                    label="Requisitos"
                    value={this.state.requisitos}
                    onChange={this.handleChange}
                    xl={6}
                  >
                    <option defaultValue="">-</option>
                    <option value="1">Altos</option>
                    <option value="2">Medios</option>
                    <option value="2">Bajos</option>
                  </Select>
                </li>
                <li>
                  <TextInput
                    label="Descripción"
                    name="descripcion"
                    value={this.state.descripcion}
                    onChange={this.handleChange}
                    xl={12}
                  />
                </li>
              </ul>
              <br />
            </div>
          </Tab>
          <Tab options={estiloTab} title="Contraseñas">
            Test 2
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const estiloTab = {
  duration: 300,
  onShow: null,
  responsiveThreshold: Infinity,
  swipeable: false,
};

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
