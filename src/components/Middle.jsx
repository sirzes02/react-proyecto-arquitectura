import React, { Component } from "react";
import {
  Button,
  Icon,
  TextInput,
  Collapsible,
  CollapsibleItem,
  Card,
  MediaBox,
} from "react-materialize";
import { Redirect } from "react-router-dom";
import M from "materialize-css";
import "../css/Middle.css";
import "../css/Scroll.css";
import Swal from "sweetalert2";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: "",
      juegos: [],
      tituloModal: "",
      descripcionModal: "",
      bus: false,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:4000/games/nuevosJuegos`)
      .then((res) => res.json())
      .then((data) => this.setState({ juegos: data }))
      .catch((err) => console.error(err));

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

  render() {
    if (this.state.bus)
      return (
        <Redirect
          to={{
            pathname: "/busqueda",
            state: { busqueda: this.state.busqueda, tipo: 1 },
          }}
        />
      );
    return (
      <div className="Middle container">
        <ul>
          <li style={{ paddingTop: 10 }}>
            <TextInput
              id="textinput_1_middle"
              name="busqueda"
              label="Búsqueda de videojuegos..."
              value={this.state.busqueda}
              onChange={(e) => this.setState({ busqueda: e.target.value })}
            />
          </li>
          <li>
            <Button
              type="submit"
              waves="light"
              className="purple darken-3"
              tooltip="Busca un videojuego con tus ideas sobre el"
              onClick={() => {
                if (this.state.busqueda.length >= 4)
                  this.setState({ bus: true });
                else {
                  Swal.fire(
                    "¡Error!",
                    "La busqueda debe tener al menos 4 caracteres.",
                    "error"
                  );
                  this.setState({ busqueda: "" });
                }
              }}
            >
              Buscar
              <Icon right>search</Icon>
            </Button>
            <Button
              style={{ float: "right" }}
              type="submit"
              waves="light"
              className="red darken-3"
              tooltip="Limpiar la entrada de datos"
              onClick={() => this.setState({ busqueda: "" })}
            >
              Limpiar
              <Icon right>delete</Icon>
            </Button>
          </li>
        </ul>
        <div style={{ paddingTop: 30, paddingBottom: 30 }}>
          <h5>Juegos más recientes añadidos</h5>
          <Collapsible accordion popout>
            {this.state.juegos.map((juego) => {
              return (
                <CollapsibleItem
                  key={juego._id}
                  expanded={false}
                  header={juego.title}
                  icon={
                    <Icon>
                      {iconos[Math.floor(Math.random() * iconos.length)]}
                    </Icon>
                  }
                >
                  <Card
                    style={{ backgroundcolor: "red" }}
                    actions={[
                      <div key={juego._id}>
                        <Button
                          className="modal-trigger yellow darken-3"
                          waves="light"
                          data-target="modal1"
                          name={juego._id}
                          onClick={this.cambioModal}
                        >
                          Descripción
                        </Button>
                      </div>,
                    ]}
                    header={
                      <MediaBox id={juego._id}>
                        <img
                          alt="Representación de juego"
                          src={
                            juego.image == null
                              ? `http://localhost:4000/uploads/undefined.png`
                              : `http://localhost:4000/${juego.image}`
                          }
                          width="300"
                          height="300"
                        />
                      </MediaBox>
                    }
                    horizontal
                  >
                    <h5>{juego.title}</h5>

                    <p style={{ paddingTop: 10 }}>
                      <span>Genero: </span>
                      {genero[juego.genre - 1]}
                      <br />
                      <span>Clasificación: </span>
                      {clasificacion[juego.clasification - 1]}
                      <br />
                      <span>Año de salida: </span>
                      {juego.year}
                      <br />
                      <span>Requisitos: </span>
                      {requisitos[juego.requirements - 1]}
                      <br />
                    </p>
                  </Card>
                </CollapsibleItem>
              );
            })}
          </Collapsible>
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

const iconos = [
  "directions_boat",
  "directions_bus",
  "directions_bike",
  "directions_run",
  "directions_transit",
  "euro_symbol",
  "flight",
  "home",
  "music_note",
  "whatshot",
];

const genero = ["Accion", "Aventura", "Carreras", "Deportes", "Rol"];
const clasificacion = ["EC", "E", "E + 10", "T", "M", "AO", "RP"];
const requisitos = ["Altos", "Medios", "Bajos"];
