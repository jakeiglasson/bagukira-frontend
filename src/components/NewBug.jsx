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

  componentWillMount = () => {
    if (this.props.authorized == false) {
      alert("You are not authorized to access this resource");
      this.props.history.push("/");
      window.location.reload(true);
    }
  };

  handleSubmit = async (event) => {
    // alert("A new bug was submitted: " + this.state.subjectValue);
    console.log("New Bug > handleSubmit");
    console.log("|-> state:", this.state);
    event.preventDefault();

    // check:
    let reported_by = this.state.reporterNameValue;
    let description = this.state.descriptionValue;
    let severity = this.state.severityValue;
    let subject = this.state.subjectValue;

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

    console.log(this.state);
    await axios
      .post(
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
      )
      .then(function (response) {
        console.log(response);
        alert("Bug was successfully submitted!");
        window.location.reload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    console.log(severity);

    this.setState({ severityValue: severity }, () => {
      console.log(this.state);
    });
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
    // let style = this.setSeverityStatusStyle(severityValue);
    if (this.state.severityValue) {
      return (
        // <Button variant={style} disabled>
        //   {this.state.severityValue}
        // </Button>
        this.state.severityValue
      );
    } else {
      return (
        // <Button variant={style} disabled>
        //   NOT SET
        // </Button>
        "NOT SET"
      );
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
          {/* {this.renderSeverityStatus(this.state.severityValue.toUpperCase())}{" "} */}
          <Dropdown
            as={ButtonGroup}
            onSelect={(severity) => {
              this.handleSelect(severity);
            }}
          >
            {/* <Button variant="primary dropDownTextContainer">
              <div className="dropDownText">
                {this.setSeverityStatusText(
                  this.state.severityValue.toUpperCase()
                )}
              </div>
            </Button>

            <Dropdown.Toggle
              split
              variant="primary"
              id="dropdown-split-basic"
            /> */}
            <Dropdown.Toggle id="dropdown-basic" variant="primary">
              {this.setSeverityStatusText(
                this.state.severityValue.toUpperCase()
              )}
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
