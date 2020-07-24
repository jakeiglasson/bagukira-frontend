import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "./css/Global.css";

class home extends Component {
  displayAlert = () => {
    try {
      if (this.props.location.state.alertNotLoggedIn) {
        this.props.location.state.alertNotLoggedIn = false;
        return (
          <Alert className="alert" variant={"danger"}>
            You must be logged in to perform this action
          </Alert>
        );
      }
    } catch (error) {
      return;
    }
  };

  redirectToProjects = () => {
    if (localStorage.getItem("userId") != null) {
      return <Redirect to={{ pathname: "/projects" }} />;
    }
  };

  render() {
    console.log(this.props);
    return (
      <>
        {this.displayAlert()}
        {this.redirectToProjects()}
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
      </>
    );
  }
}

export default home;
