import React, { Component } from "react";
import { Button, Icon, TextInput } from "react-materialize";
//import axios from "axios";
import "./css/Middle.css";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: "",
    };
  }

  imprimir = () => {
    console.log(this.state);

    /*
    axios
      .get(`http://localhost:4000/games`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    
    axios
      .post("http://localhost:4000/games/", {
        title: "GTA",
        genre: "ACCION",
        clasification: "+18",
        year: 2004,
        hardware: "PC - MOVIL",
        requirements: 1,
        description: "GTA es un juego de accion",
      })
      .then((res) => console.log(res));
  */
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
              <div style={{ float: "right" }}>
                <Button
                  node="button"
                  type="submit"
                  waves="light"
                  className="red darken-3"
                  onClick={() => this.setState({ busqueda: "" })}
                >
                  Borrar
                  <Icon right>delete</Icon>
                </Button>
              </div>
              <br />
            </li>
          </ul>
        </div>
        <br />
      </div>
    );
  }
}
