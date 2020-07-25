import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import "./css/AddUser.css";
import "./css/Global.css";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailsValue: "",
      emailsAreValid: false,
    };
    console.log(this.props);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);

    let string = this.state.emailsValue.replace(/\s+/g, ""); //remove spaces
    let array = string.split(","); // separate by commas into array

    try {
      array.forEach((email) => this.ValidateEmail(email));
      this.setState({ emailsAreValid: true }, () => {
        console.log(this.state);
      });
    } catch (error) {
      alert(error);
    }

    // After passing above test, string contains valid emails and can be sent to backend
    this.postEmails(string);
  };

  ValidateEmail(mail) {
    console.log(mail);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      // this.setState({ emailsAreValid: false });
      throw "invalid email detected";
    }
  }

  postEmails = (emailString) => {
    // logic to send emails to backend
  };

  handleChange = (event) => {
    this.setState({ emailsValue: event.target.value });
  };

  renderAddUserForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="addUserExplanationText pt-2 pb-4">
          <ul>
            <li>To add users:</li>
            <li>1. Input user emails separated by commas</li>
            <li>
              2. Hit submit. When submitted, these users will receive an email
              with a link to this project.
            </li>
            <li>
              Note: If an invalid email is detected when submitted an alert will
              popup
            </li>
          </ul>
        </div>
        <Form.Group controlId="addUserForm.ControlTextarea1">
          {/* <Form.Label>EMAILS</Form.Label> */}
          <Form.Control
            as="textarea"
            rows="6"
            placeholder="EMAILS"
            value={this.state.emailsValue}
            onChange={(event) => {
              this.handleChange(event);
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
          <h2 className="text-center">ADD USER</h2>
          {this.renderAddUserForm()}
        </div>
      </div>
    );
  }
}

export default AddUser;
