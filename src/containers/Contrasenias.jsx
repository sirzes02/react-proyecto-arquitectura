import React, { Component } from "react";
import { TextInput, Button, Icon, Table } from "react-materialize";
import M from "materialize-css";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwords: []
    };
  }

  componentDidMount() {
    this.listaPassword();
  }

  listaPassword = () => {
    fetch(`http://localhost:4000/passwords/`)
      .then(res => res.json())
      .then(data => this.setState({ passwords: data }))
      .catch(err => console.error(err));
  };

  aniadirpass = e => {
    e.preventDefault();

    if (this.state.password.length >= 4) {
      this.setState({ password: btoa(this.state.password) });

      fetch(`http://localhost:4000/passwords/`, {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(() => {
          M.toast({ html: "Nuevo contraseña almacenada" });
          this.listaPassword();
        })
        .catch(err => console.error(err));

      this.setState({
        _id: "",
        password: ""
      });
    } else M.toast({ html: "La contraseña debe contener mas de 4 caracteres" });
  };

  eliminarpass(id) {
    if (this.state.passwords.length > 1)
      fetch(`http://localhost:4000/passwords/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(() => {
          M.toast({ html: "Contraseña eliminada" });
          this.listaPassword();
        });
    else M.toast({ html: "No puedes eliminar la ultima contraseña" });
  }

  render() {
    return (
      <div className="passs">
        <div className="container z-depth-1" style={{ height: 150 }}>
          <form onSubmit={this.aniadirpass}>
            <ul className="container">
              <li>
                <TextInput
                  id="textinput_1_contrasenia"
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
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
                      password: ""
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
          <Table hoverable responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Contraseña</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.passwords.map(password => {
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
                      <Button small waves="light" className="yellow darken-3">
                        <Icon>remove_red_eye</Icon>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
