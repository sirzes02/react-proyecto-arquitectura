import React, { Component } from "react";
import { TextInput, Button, Icon, Table } from "react-materialize";
import M from "materialize-css";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwords: [],
    };
  }

  componentDidMount() {
    this.listaPassword();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  listaPassword = () => {
    fetch(`http://localhost:4000/passwords/`)
      .then((res) => res.json())
      .then((data) => this.setState({ passwords: data }))
      .catch((err) => console.error(err));
  };

  aniadirpass = (e) => {
    e.preventDefault();

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
        M.toast({ html: "Nuevo password almacenado" });
        this.listaPassword();
      })
      .catch((err) => console.error(err));

    this.setState({
      _id: "",
      password: "",
    });
  };

  eliminarpass(id) {
    fetch(`http://localhost:4000/passwords/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        M.toast({ html: "password eliminado" });
        this.listaPassword();
      });
  }

  render() {
    return (
      <div className="passs">
        <div className="container z-depth-1" style={{ height: 150 }}>
          <form onSubmit={this.aniadirpass}>
            <ul className="container">
              <li>
                <TextInput
                  id="2_"
                  label="Contraseña"
                  name="password"
                  type="text"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                  xl={12}
                />
              </li>
              <li>
                <Button
                  node="button"
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
                  node="button"
                  type="reset"
                  tooltip="Limpiar los campos"
                  waves="light"
                  className="red darken-3"
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
          <Table>
            <thead>
              <tr>
                <th data-field="id">Id</th>
                <th data-field="titulo">Contraseña</th>
                <th data-field="botones"></th>
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
                        node="button"
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
    );
  }
}
