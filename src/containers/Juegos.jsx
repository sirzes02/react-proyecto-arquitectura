import React, { Component } from "react";
import {
  Range,
  TextInput,
  Select,
  Button,
  Icon,
  Table,
  Modal,
} from "react-materialize";
import M from "materialize-css";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      genre: "1",
      clasification: "1",
      year: 2000,
      hardware: "1",
      requirements: "1",
      description: "",
      juegos: [],
    };
  }

  componentDidMount() {
    this.listaJuegos();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  listaJuegos = () => {
    fetch(`http://localhost:4000/games/`)
      .then((res) => res.json())
      .then((data) => this.setState({ juegos: data }))
      .catch((err) => console.error(err));
  };

  aniadirJuego = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/games/`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        M.toast({ html: "Nuevo juego almacenado" });
        this.listaJuegos();
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div className="Juegos">
        <div className="container z-depth-1" style={{ height: 510 }}>
          <form onSubmit={this.aniadirJuego}>
            <ul className="container" style={{ paddingTop: 20 }}>
              <li>
                <TextInput
                  id="2"
                  label="Titulo"
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                  xl={6}
                />
              </li>
              <li>
                <Select
                  name="genre"
                  id="gen_jue"
                  label="Genero"
                  value={this.state.genre}
                  onChange={this.handleChange}
                  xl={6}
                >
                  <option defaultValue="1">Accion</option>
                  <option value="2">Aventura</option>
                  <option value="3">Carreras</option>
                  <option value="4">Deportes</option>
                  <option value="5">Rol</option>
                </Select>
              </li>
              <li>
                <Select
                  name="clasification"
                  id="cla_jue"
                  options={estiloSelect}
                  label="Clasificación"
                  value={this.state.clasification}
                  onChange={this.handleChange}
                  xl={12}
                >
                  <option defaultValue="1">EC</option>
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
                  name="year"
                  value={this.state.year}
                  onChange={this.handleChange}
                />
              </li>
              <li>
                <Select
                  id="har_jue"
                  name="hardware"
                  options={estiloSelect}
                  label="Dispositivo"
                  value={this.state.hardware}
                  onChange={this.handleChange}
                  xl={6}
                >
                  <option defaultValue="1">Celular</option>
                  <option value="2">Computadora</option>
                </Select>
              </li>
              <li></li>
              <li>
                <TextInput
                  id="1"
                  label="Descripción"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  xl={12}
                />
              </li>
              <li style={{ paddingTop: 180 }}>
                <Button
                  node="button"
                  type="submit"
                  waves="light"
                  className="purple darken-3"
                >
                  Enviar
                  <Icon right>send</Icon>
                </Button>
                <Button
                  node="button"
                  type="reset"
                  waves="light"
                  className="red darken-3"
                  style={{ float: "right" }}
                  onClick={() =>
                    this.setState({
                      title: "",
                      genre: "1",
                      clasification: "1",
                      year: 2000,
                      hardware: "1",
                      requirements: "1",
                      description: "",
                    })
                  }
                >
                  Limpiar
                  <Icon right>delete</Icon>
                </Button>
              </li>
            </ul>
          </form>
        </div>
        <div style={{ paddingTop: 40 }} className="container">
          <Table>
            <thead>
              <tr>
                <th data-field="titulo">Titulo</th>
                <th className="center" data-field="genre">
                  Genero
                </th>
                <th className="center" data-field="clasificación">
                  Clasificación
                </th>
                <th className="center" data-field="year">
                  Año
                </th>
                <th className="center" data-field="hardwares">
                  hardwares
                </th>
                <th className="center" data-field="requerimientos">
                  Requerimientos
                </th>
                <th data-field="description">Descripción</th>
                <th data-field="botones"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.juegos.map((juego) => {
                return (
                  <tr key={juego._id}>
                    <td>{juego.title}</td>
                    <td className="center">{juego.genre}</td>
                    <td className="center">{juego.clasification}</td>
                    <td className="center">{juego.year}</td>
                    <td className="center">{juego.hardware}</td>
                    <td className="center">{juego.requirements}</td>
                    <td>
                      <Modal
                        actions={[
                          <Button modal="close" node="button" waves="light">
                            Cerrar
                          </Button>,
                        ]}
                        header={`Descripción de: ${juego.title}`}
                        options={estiloModal}
                        trigger={
                          <Button
                            node="button"
                            waves="light"
                            className="yellow darken-3"
                          >
                            Leer
                          </Button>
                        }
                      >
                        <p text="HOLA">{juego.description}</p>
                      </Modal>
                    </td>
                    <td>
                      <Button
                        small
                        node="button"
                        waves="light"
                        className="red darken-3"
                      >
                        <Icon>delete</Icon>
                      </Button>
                      <Button
                        small
                        node="button"
                        waves="light"
                        className="pink lighten-3"
                      >
                        <Icon>edit</Icon>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const estiloModal = {
  dismissible: true,
  endingTop: "10%",
  inDuration: 250,
  onCloseEnd: null,
  onCloseStart: null,
  onOpenEnd: null,
  onOpenStart: null,
  opacity: 0.5,
  outDuration: 250,
  preventScrolling: true,
  startingTop: "4%",
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
