import React, { Component } from "react";
import { TextInput, Button, Icon } from "react-materialize";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import "../css/Administrador.css";
import Swal from "sweetalert2";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = { password: "", admin: false };
  }

  componentDidMount() {
    if (localStorage.getItem("admin") !== "") this.props.toTrue();
    else this.props.toFalse();
  }

  login = (e) => {
    e.preventDefault();

    fetch(`http://localhost:4000/passwords/${this.state.password}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          this.props.toTrue();
          this.setState({ admin: true });
          localStorage.setItem("admin", true);
        } else {
          this.setState({ password: "" });
          Swal.fire("¡Error!", "La contraseña es incorrecta.", "error");
        }
      })
      .catch((err) => console.error(err));
    /*
    fetch(`http://localhost:4000/passwords/`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).catch((err) => console.error(err));*/
  };

  render() {
    if (this.state.admin || localStorage.getItem("admin"))
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
  toTrue: PropTypes.func.isRequired,
  toFalse: PropTypes.func.isRequired,
};
