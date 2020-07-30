import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import "./css/Global.css";
import { cssNumber } from "jquery";
import { faThermometerHalf } from "@fortawesome/free-solid-svg-icons";

class home extends Component {
  state = {
    clearLocalStorage: true,
    displayAlert: false,
  };

  componentWillMount = () => {
    if (localStorage.userId) {
      this.setState({ clearLocalStorage: false });
      this.props.history.push("/projects");
      window.location.reload(true);
    } else {
      this.setState({ clearLocalStorage: true });
    }
  };

  componentDidMount = () => {
    if (this.state.clearLocalStorage) {
      localStorage.clear();
    }
  };

  displayAlert = () => {
    if (this.state.displayAlert) {
      this.setState({ displayAlert: false });
      return (
        <Alert className="alert" variant={"danger"}>
          You must be logged in to perform this action
        </Alert>
      );
    }
  };

  redirectToProjects = () => {
    if (localStorage.getItem("userId") != null) {
      return <Redirect to={{ pathname: "/projects" }} />;
    }
  };

  render() {
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
