import React, { Component } from "react";
import {
  Range,
  TextInput,
  Select,
  Button,
  Icon,
  Table
} from "react-materialize";
import M from "materialize-css";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      title: "",
      genre: "1",
      clasification: "1",
      year: 2000,
      hardware: "1",
      requirements: "1",
      description: "",
      juegos: []
    };
  }

  componentDidMount() {
    this.listaJuegos();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  listaJuegos = () => {
    fetch(`http://localhost:4000/games/`)
      .then(res => res.json())
      .then(data => this.setState({ juegos: data }))
      .catch(err => console.error(err));
  };

  aniadirJuego = e => {
    e.preventDefault();

    if (!this.state._id)
      fetch(`http://localhost:4000/games/`, {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(() => {
          M.toast({ html: "Nuevo juego almacenado" });
          this.listaJuegos();
        })
        .catch(err => console.error(err));
    else
      fetch(`http://localhost:4000/games/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          M.toast({ html: "Juego actualizado" });
          this.listaJuegos();
        });

    this.setState({
      _id: "",
      title: "",
      genre: "1",
      clasification: "1",
      year: 2000,
      hardware: "1",
      requirements: "1",
      description: ""
    });
  };

  eliminarJuego(id) {
    fetch(`http://localhost:4000/games/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(() => {
        M.toast({ html: "Juego eliminado" });
        this.listaJuegos();
      });
  }

  render() {
    return (
      <div className="Juegos">
        <div className="container z-depth-1" style={{ height: 510 }}>
          <form onSubmit={this.aniadirJuego}>
            <ul className="container" style={{ paddingTop: 20 }}>
              <li>
                <TextInput
                  id="textInput_1_juegos"
                  name="title"
                  type="text"
                  label="Titulo"
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                  xl={6}
                />
              </li>
              <li>
                <Select
                  id="select_1_juegos"
                  name="genre"
                  label="Genero"
                  value={this.state.genre}
                  onChange={this.handleChange}
                  xl={6}
                >
                  <option value="1">Accion</option>
                  <option value="2">Aventura</option>
                  <option value="3">Carreras</option>
                  <option value="4">Deportes</option>
                  <option value="5">Rol</option>
                </Select>
              </li>
              <li>
                <Select
                  id="select_2_juegos"
                  name="clasification"
                  label="Clasificación"
                  value={this.state.clasification}
                  onChange={this.handleChange}
                  xl={12}
                >
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
                  id="range_1_juegos"
                  name="year"
                  max="2020"
                  min="1980"
                  value={this.state.year}
                  onChange={this.handleChange}
                />
              </li>
              <li>
                <Select
                  id="select_3_juegos"
                  name="hardware"
                  label="Dispositivo"
                  value={this.state.hardware}
                  onChange={this.handleChange}
                  xl={6}
                >
                  <option value="1">Celular</option>
                  <option value="2">Computadora</option>
                </Select>
              </li>
              <li>
                <Select
                  id="select_4_juegos"
                  name="requirements"
                  label="Requisitos"
                  value={this.state.requirements}
                  onChange={this.handleChange}
                  xl={6}
                >
                  <option value="1">Altos</option>
                  <option value="2">Medios</option>
                  <option value="3">Bajos</option>
                </Select>
              </li>
              <li>
                <TextInput
                  id="textinpu_2_juegos"
                  name="description"
                  label="Descripción"
                  value={this.state.description}
                  onChange={this.handleChange}
                  xl={12}
                />
              </li>
              <li style={{ paddingTop: 180 }}>
                <Button
                  type="submit"
                  waves="light"
                  className="purple darken-3"
                  tooltip="Enviar los datos"
                >
                  Enviar
                  <Icon right>send</Icon>
                </Button>
                <Button
                  type="reset"
                  waves="light"
                  className="red darken-3"
                  tooltip="Limpiar los campos"
                  style={{ float: "right" }}
                  onClick={() =>
                    this.setState({
                      _id: "",
                      title: "",
                      genre: "1",
                      clasification: "1",
                      year: 2000,
                      hardware: "1",
                      requirements: "1",
                      description: ""
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
          <Table hoverable responsive>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Genero</th>
                <th>Clasificación</th>
                <th>Año</th>
                <th>hardward</th>
                <th>Requerimientos</th>
                <th>Descripción</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.juegos.map(juego => {
                return (
                  <tr key={juego._id}>
                    <td>{juego.title}</td>
                    <td>{genero[juego.genre]}</td>
                    <td className="center">
                      {clasificacion[juego.clasification]}
                    </td>
                    <td className="center">{juego.year}</td>
                    <td>{dispositivo[juego.hardware]}</td>
                    <td>{requisitos[juego.requirements]}</td>
                    <td>{juego.description}</td>
                    <td>
                      <Button
                        small
                        waves="light"
                        className="red darken-3"
                        onClick={() => this.eliminarJuego(juego._id)}
                      >
                        <Icon>delete</Icon>
                      </Button>
                      <Button
                        small
                        waves="light"
                        className="pink lighten-3"
                        onClick={() => {
                          this.setState({
                            _id: juego._id,
                            title: juego.title,
                            genre: juego.genre,
                            clasification: juego.clasification,
                            year: juego.year,
                            hardware: juego.hardware,
                            requirements: juego.requirements,
                            description: juego.description
                          });
                        }}
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

const genero = ["Accion", "Aventura", "Carreras", "Deportes", "Rol"];
const clasificacion = ["EC", "E", "E + 10", "T", "M", "AO", "RP"];
const dispositivo = ["Celular", "Computador"];
const requisitos = ["Altos", "Medios", "Bajos"];
