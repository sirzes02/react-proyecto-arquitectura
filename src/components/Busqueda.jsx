import React, { Component } from "react";
import {
  Collapsible,
  CollapsibleItem,
  Button,
  MediaBox,
  Card,
  Icon,
} from "react-materialize";
import M from "materialize-css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/Scroll.css";

export default class _ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      juegos: [],
      mostrar: [],
      tituloModal: "",
      descripcionModal: "",
    };
  }

  async componentDidMount() {
    await fetch(`http://localhost:4000/games/`)
      .then((res) => res.json())
      .then((data) => this.setState({ juegos: data }))
      .catch((err) => console.error(err));

    let arr = [];

    if (this.props.location.state.tipo === 1) {
      for (let i = 0; i < this.state.juegos.length; i++)
        if (
          this.state.juegos[i].description
            .toLowerCase()
            .search(this.props.location.state.busqueda.toLowerCase()) !== -1
        )
          arr.push(this.state.juegos[i]);

      this.setState({ mostrar: arr });
    } else this.setState({ mostrar: this.state.juegos });

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
    for (let i = 0; i < this.state.mostrar.length; i++)
      if (this.state.mostrar[i]._id === e.target.name) {
        this.setState({
          tituloModal: this.state.mostrar[i].title,
          descripcionModal: this.state.mostrar[i].description,
        });
        break;
      }
  };

  buscarGeneral = async (busqueda) => {
    if (busqueda[0].length >= 4) {
      let arr = [];

      for (let i = 0; i < this.state.juegos.length; i++) {
        if (
          this.state.juegos[i].title
            .toLowerCase()
            .search(busqueda[0].toLowerCase()) !== -1
        ) {
          arr.push(this.state.juegos[i]);
          continue;
        }
        if (
          genero[this.state.juegos[i].genre - 1]
            .toLowerCase()
            .search(busqueda[0].toLowerCase()) !== -1
        ) {
          arr.push(this.state.juegos[i]);
          continue;
        }
        if (this.state.juegos[i].year === busqueda[0]) {
          arr.push(this.state.juegos[i]);
          continue;
        }
        if (
          hardware[this.state.juegos[i].hardware - 1]
            .toLowerCase()
            .search(busqueda[0].toLowerCase()) !== -1
        ) {
          arr.push(this.state.juegos[i]);
          continue;
        }
        if (
          requisitos[this.state.juegos[i].requirements - 1]
            .toLowerCase()
            .search(busqueda[0].toLowerCase()) !== -1
        ) {
          arr.push(this.state.juegos[i]);
          continue;
        }
        if (
          this.state.juegos[i].description
            .toLowerCase()
            .search(busqueda[0].toLowerCase()) !== -1
        ) {
          arr.push(this.state.juegos[i]);
          continue;
        }
      }

      /*

      if (busqueda[1] !== "")
        for (let i = 0; i < arr.length; i++)
          if (
            clasificacion[arr[i].clasification - 1].toLowerCase() !==
            busqueda[1].toLowerCase()
          )
            arr.pop(arr[i]);
*/

      this.setState({ mostrar: arr });
    } else
      M.toast({
        html: "Su busqueda de datos debe teenr al menos cuatro caracteres",
      });
  };

  render() {
    return (
      <div className="Busqueda container">
        <h5>
          Busqueda por:{" "}
          <b>
            {this.props.location.state.tipo === 1
              ? "Palabras claves"
              : this.props.location.state.tipo === 2
              ? "Parametrización"
              : "Todos"}
          </b>
        </h5>
        <br />
        <div style={{ float: "right", marginRight: "3%" }}>
          <b>Cantidad:</b> {this.state.mostrar.length}
        </div>
        <div className="scroll">
          <Collapsible accordion popout>
            {this.state.mostrar.map((juego) => {
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
        <div style={{ marginTop: "2%", marginBottom: "2%" }}>
          <Link to="/">
            <Button type="submit" waves="light" className="purple darken-3">
              {this.props.location.state.tipo === 1 ||
              this.props.location.state.tipo === 3
                ? "Atras"
                : "Inicio"}
              <Icon left>arrow_back</Icon>
            </Button>
          </Link>
          <Button
            tooltip="Buscar por datos"
            style={{ float: "right" }}
            className="yellow darken-4"
            onClick={() =>
              Swal.mixin({
                input: "text",
                confirmButtonText: "Siguiente &rarr;",
                cancelButtonText: "Cancelar",
                showCancelButton: true,
                progressSteps: ["1", "2"],
              })
                .queue([
                  {
                    title: "Ingrese datos para buscar",
                    text: "Debe ingresar cualquier palabra como referencia",
                  },
                  {
                    title: "Ingrese Clasificación",
                    text: "Debe ingrese una clasificación",
                  },
                ])
                .then((result) => {
                  if (result.value) {
                    const answers = result.value;
                    Swal.fire({
                      title: "¡Busqueda realizada!",
                      html: `
                      Datos de busqueda:
                      <pre><code>${answers[0]} - ${answers[1]}</code></pre>
                    `,
                      confirmButtonText: "Okay",
                      timer: 1000,
                    });
                    this.buscarGeneral(answers);
                  }
                })
            }
          >
            Buscar <Icon right>search</Icon>
          </Button>
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
const hardware = ["Computador", "Celular"];
