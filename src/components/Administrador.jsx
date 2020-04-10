import React, { Component } from "react";
import M from "materialize-css";
import { TextInput, Button, Icon } from "react-materialize";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./css/Administrador.css";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = { password: "", admin: false };
  }

  componentDidMount() {
    M.Sidenav.init(document.querySelector("#slide-out"), {});
    if (localStorage.getItem("admin")) this.props.actualizar();
  }

  render() {
    if (this.state.admin || localStorage.getItem("admin"))
      return <Redirect to="/admin" />;
    return (
      <div className="Administrador">
        <div className="container">
          <TextInput
            id="password"
            label="Contraseña de ingreso"
            password
            value={this.state.password}
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />
          <Button
            node="button"
            type="submit"
            waves="light"
            tooltip="Ingresar a la sección de administrador"
            className="purple darken-3"
            onClick={() => {
              axios
                .get(`http://localhost:4000/passwords/${this.state.password}`)
                .then((res) => {
                  if (res.data.status) {
                    this.props.actualizar();
                    this.setState({ admin: true });
                    localStorage.setItem("admin", true);
                  } else {
                    this.setState({ password: "" });
                    M.toast({ html: "¡Contraseña incorrecta!" });
                  }
                })
                .catch((err) => console.log(err));
            }}
          >
            Ingresar
            <Icon right>send</Icon>
          </Button>
        </div>
        <br />
      </div>
    );
  }
}
