import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Middle from "./components/Middle";
import Busqueda from "./components/Busqueda";
import Header from "./components/Header";
import Parallax from "./components/Parallax";
import Footer from "./components/Footer";
import img from "./assets/back.jpg";

export default class _ extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Parallax imagen={img} />
          <Switch>
            <Route path="/busqueda">
              <Busqueda />
            </Route>
            <Route path="/" exact>
              <Middle />
            </Route>
          </Switch>
          <Parallax imagen={img} />
          <Footer />
        </Router>
      </div>
    );
  }
}
