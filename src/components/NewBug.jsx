import React, { Component } from "react";
import {
  Form,
  Button,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";

import axios from "axios";

import { GetTime } from "./shared/Helpers.jsx";

import "./css/NewBug.css";
import "./css/Global.css";

class NewBug extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params);
    this.state = {
      id: "",
      idInProject: "",
      reporterNameValue: "",
      subjectValue: "",
      descriptionValue: "",
      severityValue: "",
      hash: this.props.match.params.hash,
    };
  }

  componentWillMount = () => {
    this.bugAmount();
    this.bugAmountInProject();
  };

  // Get amount of bugs in JSON db to set new bug {id} to amount of bugs + 1
  bugAmount = () => {
    axios.get(this.props.serverRootUrl + "/bugs").then((response) => {
      this.setState({ id: response.data.length + 1 }, function () {
        console.log("setState completed", this.state);
      }); // response.data.length + 1
    });
  };

  // Get amount of bugs in current project in JSON db to set new bug {idInProject} to amount of bugs + 1
  bugAmountInProject = () => {
    axios
      .get(this.props.serverRootUrl + "/bugs?projectRefHash=" + this.state.hash)
      .then((response) => {
        console.log(response);
        this.setState({ idInProject: response.data.length + 1 }, function () {
          console.log("setState completed", this.state);
        }); // response.data.length + 1;
      });
  };

  handleSubmit = (event) => {
    // alert("A new bug was submitted: " + this.state.subjectValue);
    console.log("New Project > handleSubmit");
    console.log("|-> state:", this.state);
    event.preventDefault();

    const dateTime = GetTime();

    // check:
    let reported_by = this.state.reporterNameValue;
    let description = this.state.descriptionValue;
    let severity = this.state.severityValue;
    let subject = this.state.subjectValue;

    if (!reported_by || !description || !severity || !subject) {
      alert(
        "Missing Information! All fields must be set before a bug can be submitted!"
      );
      return;
    }

    axios
      .post(this.props.serverRootUrl + "/bugs", {
        id: this.state.id,
        idInProject: this.state.idInProject,
        projectRefHash: this.state.hash,
        subject: this.state.subjectValue,
        status: "OPEN",
        severity: this.state.severityValue,
        description: this.state.descriptionValue,
        created_at: dateTime,
        closed_at: "-",
        reported_by: this.state.reporterNameValue,
        closed_by: "-",
      })
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
        this.setState({ reporterNameValue: event.target.value });
        break;

      case "BUG SUBJECT":
        this.setState({ subjectValue: event.target.value });
        break;

      case "BUG DESCRIPTION":
        this.setState({ descriptionValue: event.target.value });
        break;
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
