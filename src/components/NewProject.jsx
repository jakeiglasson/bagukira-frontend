import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A new project was submitted: " + this.state.value);
    // console.log("New Project > handleSubmit");
    // console.log("|-> state:", this.state);
    event.preventDefault();

    // A lot of this code is unneeded, when the backend is working only project name and user id will need to be sent through. Also we will not need to get the amount of projects in the db, so we can remove the first request.

    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;

    // Get amount of projects in JSON db
    let id, hash, userId, name, created_at;
    axios
      .get(this.props.serverRootUrl + "/projects")
      .then((response) => {
        id = hash = response.data.length + 1;
        userId = localStorage.getItem("userId");
        name = this.state.value;
        created_at = dateTime;
      })
      .then(() => {
        axios
          .post(this.props.serverRootUrl + "/projects", {
            id: id,
            hashId: hash,
            userId: userId,
            name: name,
            created_at: created_at,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .then(() => {
        this.setState({ hash: hash });
        this.setState({ redirect: true });
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
            value={this.state.value}
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
