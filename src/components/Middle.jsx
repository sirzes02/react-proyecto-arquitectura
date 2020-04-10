import React, { Component } from "react";
import {
  Button,
  Icon,
  TextInput,
  Collapsible,
  CollapsibleItem,
  Card,
  CardTitle,
} from "react-materialize";
import axios from "axios";
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
    axios
      .get(`http://localhost:4000/games`)
      .then((res) => {
        this.setState({ juegos: res.data });
        console.log(this.state.juegos);
      })
      .catch((err) => console.log(err));
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
                  onClick={() => this.setState({ busqueda: "" })}
                >
                  Borrar
                  <Icon right>delete</Icon>
                </Button>
              </div>
              <br />
            </li>
          </ul>
          <br />
          <br />
          Los videojuegos mas recientes:
          <Collapsible accordion>
            {this.state.juegos.map((juego) => {
              return (
                <CollapsibleItem
                  key={juego._id}
                  expanded={false}
                  header={juego.title}
                  icon={<Icon>filter_drama</Icon>}
                  node="div"
                >
                  <Card
                    style={{ backgroundcolor: "red" }}
                    actions={[<div key={juego._id}>This is a link</div>]}
                    header={
                      <CardTitle image="https://materializecss.com/images/sample-1.jpg" />
                    }
                    horizontal
                  >
                    Here is the standard card with a horizontal image.
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
