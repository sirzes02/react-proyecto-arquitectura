import React, { Component } from "react";
import {
  Button,
  Icon,
  TextInput,
  Collapsible,
  CollapsibleItem,
  Card,
  MediaBox,
  Modal,
} from "react-materialize";
import { Link } from "react-router-dom";
import "../css/Middle.css";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: "",
      juegos: [],
    };
  }

  componentDidMount() {
    fetch(`http://localhost:4000/games/nuevosJuegos`)
      .then((res) => res.json())
      .then((data) => this.setState({ juegos: data }))
      .catch((err) => console.error(err));
  }

  imprimir = () => {
    this.setState({
      juegos: [],
      renderer: true,
    });
  };

  render() {
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
            <Link to="/busqueda">
              <Button
                type="submit"
                waves="light"
                className="purple darken-3"
                onClick={this.imprimir}
                tooltip="Busca un videojuego con tus ideas sobre el"
              >
                Buscar
                <Icon right>search</Icon>
              </Button>
            </Link>
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
          <Collapsible accordion>
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
                        <Modal
                          id={juego._id}
                          actions={[
                            <Button
                              flat
                              modal="close"
                              node="button"
                              waves="green"
                            >
                              Cerrar
                            </Button>,
                          ]}
                          header={juego.title}
                          trigger={
                            <Button
                              node="button"
                              className="purple darken-3"
                              id={juego._id}
                            >
                              Leer descripción
                            </Button>
                          }
                        >
                          <p>{juego.description}</p>
                        </Modal>
                      </div>,
                    ]}
                    header={
                      <MediaBox id={juego._id}>
                        <img
                          alt="Representación de juego"
                          src="https://materializecss.com/images/sample-1.jpg"
                          width="450"
                        />
                      </MediaBox>
                    }
                    horizontal
                  >
                    <h5>{juego.title}</h5>

                    <p style={{ paddingTop: 10 }}>
                      <span>Genero: </span>
                      {juego.genre}
                      <br />
                      <span>Clasificación: </span>
                      {juego.clasification}
                      <br />
                      <span>Año de salida: </span>
                      {juego.year}
                      <br />
                      <span>Requisitos: </span>
                      {juego.requirements}
                      <br />
                    </p>
                  </Card>
                </CollapsibleItem>
              );
            })}
          </Collapsible>
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
