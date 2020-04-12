import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Middle from "./components/Middle";
import Busqueda from "./components/Busqueda";
import Header from "./containers/Header";
import Parallax from "./containers/Parallax";
import Footer from "./containers/Footer";
import Administrador from "./components/Administrador";
import Admin from "./components/Admin";
import img from "./assets/back.jpg";

export default class _ extends Component {
  constructor(props) {
    super(props);
    this.state = { admin: localStorage.getItem("admin") };
  }

  toTrue = () => {
    this.setState({ admin: true });
  };

  toFalse = () => {
    this.setState({ admin: true });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Parallax imagen={img} />
          <Switch>
            <Route path="/busqueda" component={Busqueda} />
            <Route path="/rutaAdministrador">
              <Administrador toTrue={this.toTrue} toFalse={this.toFalse} />
            </Route>
            {this.state.admin && <Route path="/admin" component={Admin} />}
            <Route path="/" exact component={Middle} />
            <Route>404</Route>
          </Switch>
          <Parallax imagen={img} />
          <Footer />
        </Router>
      </div>
    );
  }
}
