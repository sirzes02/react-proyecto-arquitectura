import React, { Component } from "react";
import { TextInput, Button, Icon } from "react-materialize";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import M from "materialize-css";
import "../css/Administrador.css";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = { password: "", admin: false };
  }

  componentDidMount() {
    //if (localStorage.getItem("admin")) this.props.actualizar();
  }

  login = (e) => {
    e.preventDefault();

    fetch(`http://localhost:4000/passwords/${this.state.password}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          this.props.actualizar();
          this.setState({ admin: true });
          localStorage.setItem("admin", true);
        } else {
          this.setState({ password: "" });
          M.toast({ html: "¡Contraseña incorrecta!" });
        }
      })
      .catch((err) => console.error(err));
  };

  render() {
    if (this.state.admin /*|| localStorage.getItem("admin")*/)
      return <Redirect to="/admin" />;
    return (
      <div className="Administrador container" style={{ paddingBottom: 30 }}>
        <form onSubmit={this.login}>
          <TextInput
            id="textinput_1_administrador"
            label="Contraseña de ingreso"
            password
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            required
          />
          <Button
            type="submit"
            waves="light"
            tooltip="Ingresar a la sección de administrador"
            className="purple darken-3"
          >
            Ingresar
            <Icon right>send</Icon>
          </Button>
        </form>
      </div>
    );
  }
}

_.propTypes = {
  actualizar: PropTypes.func.isRequired,
};
