import React, { Component } from "react";
import { Form, Button, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";

import { GetTime } from "./shared/Helpers.jsx";

import "./css/NewBug.css";
import "./css/Global.css";

class NewBug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reporterNameValue: "",
      bugSubjectValue: "",
      bugDescriptionValue: "",
    };
  }

  handleSubmit = (event) => {
    alert("A new project was submitted: " + this.state.value);
    // console.log("New Project > handleSubmit");
    // console.log("|-> state:", this.state);
    event.preventDefault();

    // A lot of this code is unneeded, when the backend is working only project name and user id will need to be sent through. Also we will not need to get the amount of projects in the db, so we can remove the first request.

    let dateTime = GetTime();

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
  };

  handleChange = (event, inputField) => {
    this.setState({ value: event.target.value });
  };

  handleSelect = (event) => {
    console.log(event);
  };

  renderNewBugForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        {/* <Form.Group controlId="newBugForm.ControlTextarea1">
          <Form.Label>NEW BUG FORM</Form.Label>
          <Form.Control
            type="text"
            placeholder="PROJECT NAME"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </Form.Group> */}
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>REPORTER NAME</Form.Label>
          <Form.Control
            type="text"
            placeholder="ENTER YOUR NAME"
            value={this.state.reporterNameValue}
            onChange={(event) => {
              this.handleChange(event, "REPORTER NAME");
            }}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>BUG SUBJECT</Form.Label>
          <Form.Control
            type="text"
            placeholder="ENTER BUG SUBJECT"
            value={this.state.bugSubjectValue}
            onChange={(event) => {
              this.handleChange(event, "BUG SUBJECT");
            }}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <DropdownButton id="dropdown-basic-button" title="SEVERITY">
            <Dropdown.Item href="#/action-1">HIGH</Dropdown.Item>
            <Dropdown.Item href="#/action-2">MEDIUM</Dropdown.Item>
            <Dropdown.Item href="#/action-3">LOW</Dropdown.Item>
          </DropdownButton>
        </Form.Group>

        {/* <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Choose..."
            onSelect={this.handleSelect()}
          >
            <option>Choose...</option>
            <option>...</option>
          </Form.Control>
        </Form.Group> */}

        {/* <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>BUG DESCRIPTION</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group> */}

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>BUG DESCRIPTION</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="ENTER BRIEF BUG DESCRIPTION"
            value={this.state.bugDescriptionValue}
            onChange={(event) => {
              this.handleChange(event, "BUG DESCRIPTION");
            }}
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

  render() {
    return (
      <div className="side-content-container p-4">
        <div className="p-4 global-form-container">
          <h2 className="text-center">NEW BUG FORM</h2>
          {this.renderNewBugForm()}
          {/* <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>REPORTER NAME</Form.Label>

              <Form.Control as="textarea" rows="1" />
            </Form.Group>{" "}
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>BUG SUBJECT</Form.Label>
              <Form.Control as="textarea" rows="1" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>BUG DESCRIPTION</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form> */}
        </div>
      </div>
    );
  }
}

export default NewBug;
