import React, { Component } from "react";
import {
  Button,
  Icon,
  TextInput,
  Collapsible,
  CollapsibleItem,
  Card,
  CardTitle,
  Modal,
} from "react-materialize";
import { Link } from "react-router-dom";
import "./css/Middle.css";

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
    console.log(this.state);
  };

  handleChange = (e) => {
    this.setState({ busqueda: e.target.value });
  };

  render() {
    return (
      <div className="Middle">
        <div className="container">
          <ul>
            <li>
              <br />
              <TextInput
                id="s"
                label="Búsqueda de videojuegos..."
                value={this.state.busqueda}
                onChange={this.handleChange}
              />
            </li>
            <li>
              <div style={{ float: "left" }}>
                <Link to="/busqueda">
                  <Button
                    node="button"
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
              </div>
              <div style={{ float: "right" }}>
                <Button
                  node="button"
                  type="submit"
                  waves="light"
                  className="red darken-3"
                  tooltip="Limpiar la entrada de datos"
                  onClick={() => this.setState({ busqueda: "" })}
                >
                  Limpiar
                  <Icon right>delete</Icon>
                </Button>
              </div>
              <br />
            </li>
          </ul>
          <br />
          <br />
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
                  node="div"
                >
                  <Card
                    style={{ backgroundcolor: "red" }}
                    actions={[
                      <div key={juego._id}>
                        <Modal
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
                          options={estiloModal}
                          trigger={
                            <Button node="button" className="purple darken-3">
                              Leer descripción
                            </Button>
                          }
                        >
                          <p>{juego.description}</p>
                        </Modal>
                      </div>,
                    ]}
                    header={
                      <CardTitle
                        image="https://materializecss.com/images/sample-1.jpg"
                        style={{ width: 450 }}
                      />
                    }
                    horizontal
                  >
                    <h5>{juego.title}</h5>
                    <br />
                    <p>
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
          <br />
          <br />
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
