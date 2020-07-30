import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { inputEventState } from "./shared/Helpers.jsx";

import "./css/AddUser.css";
import "./css/Global.css";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailsValue: "",
      emailsAreValid: false,
      render: false,
      hash: this.props.match.params.hash,
    };
  }

  componentWillMount = () => {
    if (!localStorage.userId) {
      alert("You are not authorized to access this resource");
      this.props.history.push("/");
      window.location.reload(true);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let string = this.state.emailsValue.replace(/\s+/g, ""); //remove spaces
    let array = string.split(","); // separate by commas into array

    try {
      array.forEach((email) => this.validateEmail(email));
      this.setState({ emailsAreValid: true }, () => {
        console.log(this.state);
      });
    } catch (error) {
      alert(error);
    }

    // After passing above test, string contains valid emails and can be sent to backend
    this.postEmails(array);
  };

  validateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      // this.setS: tate({ emailsAreValid: false });
      throw new Error("invalid email detected");
    }
  }

  postEmails = (array) => {
    let userId = localStorage.userId;
    let hash = this.props.match.params.hash;
    let route = `${process.env.REACT_APP_API_URL}/users/${userId}/units/${hash}/invite`;

    let data = JSON.stringify({
      unit: {
        invite_list: array,
      },
    });

    let config = {
      method: "post",
      url: route,
      headers: {
        Authorization: "Bearer " + localStorage.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onInputChange = (event) => inputEventState(this, event);

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
        <Form.Group>
          {/* <Form.Label>EMAILS</Form.Label> */}
          <Form.Control
            as="textarea"
            rows="6"
            placeholder="EMAILS"
            id="emailsValue"
            value={this.state.emailsValue}
            onChange={this.onInputChange}
          />
        </Form.Group>

        <Button
          type="submit"
          value="SUBMIT"
          className="btn btn-block btn-primary"
        >
          SUBMIT
        </Button>
      </Form>
    );
  };

  renderContent = () => {
    if (localStorage.userId === localStorage.projectOwnerId) {
      return (
        <div className="p-4 global-form-container">
          <h2 className="text-center">ADD USER</h2>
          {this.renderAddUserForm()}
        </div>
      );
    }
  };

  render() {
    return (
      <div className="side-content-container p-4">{this.renderContent()}</div>
    );
  }
}

export default AddUser;
