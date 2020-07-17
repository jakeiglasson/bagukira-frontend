import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Projects from "./components/Projects";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="max-height">
          <div className="text-center display-1 mb-5">
            <Link to="/" className="text-link">
              <FontAwesomeIcon icon={faBug} style={{ color: "orange" }} />{" "}
              Bagukira{" "}
              <FontAwesomeIcon icon={faBug} style={{ color: "orange" }} />
            </Link>
          </div>

          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/projects" component={Projects} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
