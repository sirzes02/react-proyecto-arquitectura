import React, { Component } from "react";
import { Footer } from "react-materialize";
import { Link } from "react-router-dom";
import "../css/Footer.css";

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
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://sweetalert2.github.io/"
                >
                  Sweet Alert 2
                </a>
              </li>
            </ul>
          }
          moreLinks={<div className="right">Santiago Varela - José Castro</div>}
        >
          <h5>Proyecto de arquitectura de la información</h5>
          <p>Objetivo de analisis: MERN - Videojuegos</p>
          <p>
            ¿Eres{" "}
            <b>
              <Link to="/rutaAdministrador">administrador</Link>
            </b>
            ?
          </p>
        </Footer>
      </div>
    );
  }
}
