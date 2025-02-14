import React, { Component } from "react";
import {
  Range,
  TextInput,
  Select,
  Button,
  Icon,
  Table,
  MediaBox,
} from "react-materialize";
import M from "materialize-css";
import Swal from "sweetalert2";

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
      image: "",
      juegos: [],
      tituloModal: "",
      descripcionModal: "",
    };
  }

  reiniciar = () =>
    this.setState({
      _id: "",
      title: "",
      genre: "1",
      clasification: "1",
      year: 2000,
      hardware: "1",
      requirements: "1",
      description: "",
      image: "",
    });

  componentDidMount() {
    this.listaJuegos();

    M.Modal.init(this.Modal, {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: "4%",
      endingTop: "10%",
    });
  }

  cambioModal = (e) => {
    for (let i = 0; i < this.state.juegos.length; i++)
      if (this.state.juegos[i]._id === e.target.name) {
        this.setState({
          tituloModal: this.state.juegos[i].title,
          descripcionModal: this.state.juegos[i].description,
        });
        break;
      }
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  listaJuegos = () =>
    fetch(`http://localhost:4000/games/`)
      .then((res) => res.json())
      .then((data) => this.setState({ juegos: data }))
      .catch((err) => console.error(err));

  aniadirJuego = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", this.state.title);
    formData.append("genre", this.state.genre);
    formData.append("clasification", this.state.clasification);
    formData.append("year", this.state.year);
    formData.append("hardware", this.state.hardware);
    formData.append("requirements", this.state.requirements);
    formData.append("description", this.state.description);
    formData.append(
      "image",
      document.querySelector('input[type="file"]').files[0]
    );

    if (!this.state._id)
      fetch(`http://localhost:4000/games/`, {
        mode: "no-cors",
        method: "POST",
        body: formData,
      })
        .then(() => {
          Swal.fire("¡Almacenado!", "El juego ha sido almacenado.", "success");
          this.listaJuegos();
        })
        .catch((err) => console.error(err));
    else
      fetch(`http://localhost:4000/games/${this.state._id}`, {
        mode: "no-cors",
        method: "POST",
        body: formData,
      })
        .then(() => {
          Swal.fire("¡Modificado!", "El juego ha sido modificado.", "success");
          this.listaJuegos();
        })
        .catch((err) => console.error(err));

    this.reiniciar();
  };

  eliminarJuego(e) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se borrará totalmente el juego",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si ¡Borrarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        fetch(`http://localhost:4000/games/${e}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            Swal.fire("¡Borrado!", "El juego ha sido borrado.", "success");
            this.listaJuegos();
          })
          .catch((err) => console.error(err));
      } else Swal.fire("Cancelado", "Proceso de eliminado cancelado.", "error");
    });
  }

  render() {
    return (
      <div className="Juegos">
        <div className="container z-depth-1" style={{ height: 590 }}>
          <form
            onSubmit={this.aniadirJuego}
            method="post"
            encType="multipart/form-data"
          >
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
                  id="textinput_2_juegos"
                  name="description"
                  label="Descripción"
                  value={this.state.description}
                  onChange={this.handleChange}
                  xl={12}
                />
              </li>
              <li>
                <TextInput
                  id="textinut_3_juegos"
                  name="image"
                  label="Imagen"
                  type="file"
                  value={this.state.image}
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
                  onClick={this.reiniciar}
                >
                  Limpiar
                  <Icon right>delete</Icon>
                </Button>
              </li>
            </ul>
          </form>
        </div>
        <div style={{ padding: 40 }}>
          <div style={{ float: "right", marginRight: "3%" }}>
            <b>Cantidad:</b> {this.state.juegos.length}
          </div>
          <div className="scroll">
            <Table hoverable responsive>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Titulo</th>
                  <th>Genero</th>
                  <th>Clasificación</th>
                  <th>Año</th>
                  <th>hardware</th>
                  <th>Requerimientos</th>
                  <th>Descripción</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.juegos.map((juego) => {
                  return (
                    <tr key={juego._id}>
                      <td>
                        <MediaBox alt="" id={juego._id}>
                          <img
                            src={
                              !juego.image
                                ? `http://localhost:4000/uploads/undefined.png`
                                : `http://localhost:4000/${juego.image}`
                            }
                            width="50"
                            alt="muestra"
                          />
                        </MediaBox>
                      </td>
                      <td>{juego.title}</td>
                      <td>{genero[juego.genre - 1]}</td>
                      <td>{clasificacion[juego.clasification - 1]}</td>
                      <td>{juego.year}</td>
                      <td>{dispositivo[juego.hardware - 1]}</td>
                      <td>{requisitos[juego.requirements - 1]}</td>
                      <td>
                        <Button
                          className="modal-trigger yellow darken-3"
                          waves="light"
                          data-target="modal1"
                          name={juego._id}
                          onClick={this.cambioModal}
                        >
                          Descripción
                        </Button>
                      </td>
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
                          onClick={() =>
                            this.setState({
                              _id: juego._id,
                              title: juego.title,
                              genre: juego.genre,
                              clasification: juego.clasification,
                              year: juego.year,
                              hardware: juego.hardware,
                              requirements: juego.requirements,
                              description: juego.description,
                            })
                          }
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
        <div
          ref={(Modal) => (this.Modal = Modal)}
          id="modal1"
          className="modal"
        >
          <div className="modal-content">
            <h4>{this.state.tituloModal}</h4>
            <p>{this.state.descripcionModal}</p>
          </div>
          <div className="modal-footer">
            <Button className="modal-close" waves="light">
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const genero = ["Accion", "Aventura", "Carreras", "Deportes", "Rol"];
const clasificacion = ["EC", "E", "E + 10", "T", "M", "AO", "RP"];
const dispositivo = ["Celular", "Computador"];
const requisitos = ["Altos", "Medios", "Bajos"];
