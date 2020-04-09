import React, { Component } from "react";
import Header from "./components/Header";
import Parallax from "./components/Parallax";
import Middle from "./components/Middle";
import Footer from "./components/Footer";
import back from "./assets/back.jpg";

export default class _ extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Parallax imagen={back} />
        <Middle />
        <Parallax imagen={back} />
        <Footer />
      </div>
    );
  }
}
