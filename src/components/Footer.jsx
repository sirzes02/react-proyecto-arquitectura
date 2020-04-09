import React, { Component } from "react";
import { Footer } from "react-materialize";
import "./css/Footer.css";

export default class _ extends Component {
  render() {
    return (
      <div className="Footer">
        <Footer
          copyrights="Universidad Santiago de Cali"
          links={
            <ul>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://materializecss.com/"
                >
                  Materialize
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="http://react-materialize.github.io/react-materialize/?path=/story/react-materialize--welcome"
                >
                  React Materialize
                </a>
              </li>
            </ul>
          }
          moreLinks={
            <div className="grey-text text-lighten-4 right">
              Santiago Varela - José Castro
            </div>
          }
        >
          <h5 className="white-text">
            Proyecto de arquitectura de la información
          </h5>
          <p className="grey-text text-lighten-4">
            Objetivo de analisis: MERN - Videojuegos
          </p>
        </Footer>
      </div>
    );
  }
}
