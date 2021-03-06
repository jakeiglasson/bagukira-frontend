import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { inputEventState } from "./shared/Helpers.jsx";

import "./css/NewProject.css";

class NewProject extends Component {
  state = { projectName: "" };

  onInputChange = (event) => inputEventState(this, event);

  //   componentDidMount = () => {
  //     if (this.props.authorized === false) {
  //       this.props.history.push("/");
  //     }
  //   };

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.state.projectName.length > 40) {
      alert("Project name is too long, 40 character limit");
      return;
    }

    const userId = localStorage.getItem("userId");
    const url = process.env.REACT_APP_API_URL + "/users/" + userId + "/units";

    try {
      const response = await axios.post(
        url,
        {
          unit: {
            name: this.state.projectName.toUpperCase(),
            unit_type: "project",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        const hash = response.data.units.id;
        this.props.history.push("./p/" + hash + "/bugs");
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  render() {
    let { projectName } = this.state;
    return (
      <div className="medium-centered-card">
        <h1 className="text-center m-3">NEW PROJECT</h1>
        <div className="new-project-form-container">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="newProjectForm.ControlTextarea1">
              <Form.Label>PROJECT NAME</Form.Label>
              <Form.Control
                id="projectName"
                type="text"
                placeholder="PROJECT NAME"
                value={projectName.toUpperCase()}
                onChange={this.onInputChange}
              />
            </Form.Group>
            <Button type="submit" className="btn btn-block btn-primary">
              SUBMIT
            </Button>
          </Form>
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
