import React, { Component } from "react";
import { Tabs, Tab, Button, Icon } from "react-materialize";
import { Redirect } from "react-router-dom";
import Juegos from "../containers/Juegos";
import Contrasenias from "../containers/Contrasenias";
import Swal from "sweetalert2";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = { admin: true };

    Swal.fire({
      title: "Bienvenido!",
      html: `Estas en la sesion de: <b>Administrador</b>`,
      timer: 2000,
    });
  }

  cerrarSesion = () => {
    localStorage.setItem("admin", "");
    this.setState({ admin: false });
  };

  render() {
    if (this.state.admin)
      return (
        <div className="Admin">
          <Tabs className="z-depth-1 center">
            <Tab active title="Videojuegos">
              <Juegos />
            </Tab>
            <Tab title="Contraseñas">
              <Contrasenias />
            </Tab>
          </Tabs>
          <div className="fixed-action-btn">
            <Button
              floating
              large
              waves="light"
              tooltip="Cerrar sesión"
              className="red"
              onClick={this.cerrarSesion}
            >
              <Icon>power_settings_new</Icon>
            </Button>
          </div>
        </div>
      );
    else return <Redirect to="/" />;
  }
}
