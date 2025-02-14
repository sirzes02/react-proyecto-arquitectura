import React, { Component } from "react";
import { TextInput, Button, Icon, Table } from "react-materialize";
import Swal from "sweetalert2";
import "../css/Scroll.css";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      password2: "",
      passwords: [],
    };
  }

  componentDidMount() {
    this.listaPassword();
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  listaPassword = () => {
    fetch(`http://localhost:4000/passwords/`)
      .then((res) => res.json())
      .then((data) => this.setState({ passwords: data }))
      .catch((err) => console.error(err));
  };

  aniadirpass = (e) => {
    e.preventDefault();

    if (this.state.password === this.state.password2) {
      if (this.state.password.length >= 4) {
        this.setState({ password: btoa(this.state.password) });

        fetch(`http://localhost:4000/passwords/`, {
          method: "POST",
          body: JSON.stringify(this.state),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire(
              "¡Almacenada!",
              "La contraseña ha sido almacenada.",
              "success"
            );
            this.listaPassword();
          })
          .catch((err) => console.error(err));

        this.setState({
          _id: "",
          password: "",
        });
      } else
        Swal.fire(
          "Cancelado",
          "La contraseña debe tener mas de 4 digitos.",
          "error"
        );
    } else
      Swal.fire("Cancelado", "Las contraseñas deben ser iguales..", "error");
  };

  eliminarpass(e) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se borrará totalmente la contraseña",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si ¡Borrarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        if (this.state.passwords.length > 1)
          fetch(`http://localhost:4000/passwords/${e}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then(() => {
              Swal.fire(
                "¡Borrada!",
                "La contraseña ha sido borrado.",
                "success"
              );
              this.listaPassword();
            });
        else
          Swal.fire(
            "Error",
            "La última contraseña no puede ser eliminada.",
            "error"
          );
      } else Swal.fire("Cancelado", "Proceso de eliminado cancelado.", "error");
    });
  }

  render() {
    return (
      <div className="passs">
        <div className="container z-depth-1" style={{ height: 240 }}>
          <form onSubmit={this.aniadirpass}>
            <ul className="container">
              <li>
                <TextInput
                  id="textinput_1_contrasenia"
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                  xl={12}
                />
              </li>
              <li>
                <TextInput
                  id="textinput_2_contrasenia"
                  label="Confirmar Contraseña"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.handleChange}
                  required
                  xl={12}
                />
              </li>
              <li>
                <Button
                  type="submit"
                  waves="light"
                  className="purple darken-3"
                  tooltip="Enviar los datos"
                  value={this.state.password}
                  onClick={this.aniadirpass}
                >
                  Enviar
                  <Icon right>send</Icon>
                </Button>
                <Button
                  type="reset"
                  waves="light"
                  className="red darken-3"
                  tooltip="Limpiar los campos"
                  style={{ float: "right" }}
                  onClick={() =>
                    this.setState({
                      password: "",
                    })
                  }
                >
                  Limpiar
                  <Icon right>delete</Icon>
                </Button>
              </li>
            </ul>
          </form>
        </div>
        <div style={{ paddingTop: 30 }} className="container">
          <div className="scroll">
            <Table hoverable responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Contraseña</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.passwords.map((password) => {
                  return (
                    <tr key={password._id}>
                      <td>{password._id}</td>
                      <td>{password.password}</td>
                      <td>
                        <Button
                          small
                          waves="light"
                          className="red darken-3"
                          onClick={() => this.eliminarpass(password._id)}
                        >
                          <Icon>delete</Icon>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
