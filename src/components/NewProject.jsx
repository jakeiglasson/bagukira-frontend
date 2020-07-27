import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import { GetTime } from "./shared/Helpers.jsx";

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectNameValue: "",
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ projectNameValue: event.target.value });
  }

  handleSubmit(event) {
    alert("A new project was submitted: " + this.state.projectNameValue);
    // console.log("New Project > handleSubmit");
    // console.log("|-> state:", this.state);
    event.preventDefault();

    // let dateTime = GetTime();
    const userId = localStorage.getItem("userId");
    const url = process.env.REACT_APP_API_URL + "/users/" + userId + "/units";
    axios
      .post(
        url,
        {
          unit: { name: this.state.projectNameValue, unit_type: "project" },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        this.setState({ hash: response.data.units.id, redirect: true });
      })
      .catch((error) => {
        alert(error);
        console.log(error);
        window.location.reload(true);
      });
  }

  newProjectFrom = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="newProjectForm.ControlTextarea1">
          <Form.Label>PROJECT NAME</Form.Label>
          <Form.Control
            type="text"
            placeholder="PROJECT NAME"
            value={this.state.projectNameValue}
            onChange={this.handleChange}
          />
        </Form.Group>
        <input
          type="submit"
          value="SUBMIT"
          className="btn btn-block btn-primary"
        />
      </Form>
    );
  };

  executeRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={"./p/" + this.state.hash + "/bugs"} />;
    }
  };

  render() {
    return (
      <div className="medium-centered-card">
        <h1 className="text-center m-3">NEW PROJECT</h1>
        <div className="new-project-form-container">
          {this.executeRedirect()}
          {this.newProjectFrom()}
          <hr />
          <Link to="/projects" className="text-link">
            <Button className="btn btn-warning btn-block" data-testid="signup">
              BACK
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default NewProject;
