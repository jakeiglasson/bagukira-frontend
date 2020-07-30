import React, { Component } from "react";
import { Form, Button, Dropdown, ButtonGroup } from "react-bootstrap";

import axios from "axios";

// import { inputEventState } from "./shared/Helpers.jsx";

import "./css/NewBug.css";
import "./css/Global.css";

class NewBug extends Component {
  state = {
    reporterNameValue: "",
    subjectValue: "",
    descriptionValue: "",
    severityValue: "",
    hash: this.props.match.params.hash,
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    // check:
    const reported_by = this.state.reporterNameValue;
    const description = this.state.descriptionValue;
    const severity = this.state.severityValue;
    const subject = this.state.subjectValue;

    if (reported_by.length > 30) {
      alert("Reporter name is too long (30 character limit)");
      return;
    }

    if (subject.length > 30) {
      alert("Bug subject is too long (30 character limit)");
      return;
    }

    if (!reported_by || !description || !severity || !subject) {
      alert(
        "Missing Information! All fields must be set before a bug can be submitted!"
      );
      return;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL +
          "/units/" +
          this.state.hash +
          "/tickets",
        {
          ticket: {
            subject: this.state.subjectValue,
            status: "OPEN",
            severity: `${this.state.severityValue}`,
            description: this.state.descriptionValue,
            opened_by: this.state.reporterNameValue,
          },
        }
      );
      if (response.status === 201) {
        alert("Bug successfully submitted!");
        window.location.reload(true);
      }
    } catch (error) {
      alert(`There was a problem with submitting your bug: ${error}`);
    }
  };

  handleChange = (event, inputField) => {
    switch (inputField) {
      case "REPORTER NAME":
        this.setState({ reporterNameValue: event.target.value.toUpperCase() });
        break;

      case "BUG SUBJECT":
        this.setState({ subjectValue: event.target.value.toUpperCase() });
        break;

      case "BUG DESCRIPTION":
        this.setState({ descriptionValue: event.target.value });
        break;

      default:
    }
  };

  handleSelect = (severity) => {
    this.setState({ severityValue: severity });
  };

  setSeverityStatusStyle = (status) => {
    let style;
    switch (status) {
      case "OPEN":
        style = "outline-danger uniform-status";
        break;

      case "IN PROGRESS":
        style = "outline-warning uniform-status";
        break;

      case "CLOSED":
        style = "outline-success uniform-status";
        break;

      default:
    }

    return style;
  };

  setSeverityStatusText = (severityValue) => {
    if (this.state.severityValue) {
      return this.state.severityValue;
    } else {
      return "NOT SET";
    }
  };

  renderNewBugForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
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
            value={this.state.subjectValue}
            onChange={(event) => {
              this.handleChange(event, "BUG SUBJECT");
            }}
          />
        </Form.Group>

        <Form.Label>BUG SEVERITY</Form.Label>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Dropdown
            as={ButtonGroup}
            onSelect={(severity) => {
              this.handleSelect(severity);
            }}
          >
            <Dropdown.Toggle id="dropdown-basic" variant="primary">
              {this.setSeverityStatusText(this.state.severityValue)}
            </Dropdown.Toggle>

            <Dropdown.Menu className="">
              <Dropdown.Item eventKey="CRITICAL">CRITICAL</Dropdown.Item>
              <Dropdown.Item eventKey="HIGH">HIGH</Dropdown.Item>
              <Dropdown.Item eventKey="MEDIUM">MEDIUM</Dropdown.Item>
              <Dropdown.Item eventKey="LOW">LOW</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>{" "}
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>BUG DESCRIPTION</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="ENTER BRIEF BUG DESCRIPTION"
            value={this.state.descriptionValue}
            onChange={(event) => {
              this.handleChange(event, "BUG DESCRIPTION");
            }}
            className="bug-description-text"
          />
        </Form.Group>
        <Button type="submit" className="btn btn-block btn-primary">
          SUBMIT
        </Button>
      </Form>
    );
  };

  render() {
    return (
      <div className="side-content-container p-4">
        <div className="p-4 global-form-container">
          <h2 className="text-center">NEW BUG FORM</h2>
          {this.renderNewBugForm()}
        </div>
      </div>
    );
  }
}

export default NewBug;
