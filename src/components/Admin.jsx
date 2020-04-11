import React, { Component } from "react";
import { Tabs, Tab } from "react-materialize";
import Juegos from "../containers/Juegos";
import Contrasenias from "../containers/Contrasenias";

export default class _ extends Component {
  render() {
    return (
      <div className="Admin">
        <Tabs className="z-depth-1 center">
          <Tab active options={estiloTab} title="Videojuegos">
            <Juegos />
          </Tab>
          <Tab options={estiloTab} title="Contraseñas">
            <Contrasenias />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const estiloTab = {
  duration: 300,
  onShow: null,
  responsiveThreshold: Infinity,
  swipeable: false,
};
