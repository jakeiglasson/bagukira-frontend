import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./css/Global.css";

class home extends Component {
  render() {
    return (
      <div className="justify-content-center">
        <div className="small-centered-card">
          <Link to="/login" className="text-link">
            <Button className="btn btn-lg btn-block mb-3" data-testid="login">
              LOGIN
            </Button>
          </Link>
          <Link to="/signup" className="text-link">
            <Button
              className="btn btn-warning btn-lg btn-block"
              data-testid="signup"
            >
              SIGNUP
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default home;
