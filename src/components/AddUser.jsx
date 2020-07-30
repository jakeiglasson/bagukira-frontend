import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { inputEventState } from "./shared/Helpers.jsx";

import "./css/AddUser.css";
import "./css/Global.css";

class AddUser extends Component {
  state = {
    emailsValue: "",
  };

  componentDidMount = () => {
    if (!localStorage.userId) {
      alert("You are not authorized to access this resource");
      this.props.history.push("/");
      window.location.reload(true);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    //remove spaces & new lines
    let emailArr = this.state.emailsValue.trim().replace(/\s+^./g, ",");
    let emailList = emailArr.split(/,+/); // divide list by commas, ignore double commas

    try {
      emailList.forEach((email) => this.validateEmail(email));
      // After passing above test, string contains valid emails and can be sent to backend
      this.postEmails(emailList);
    } catch (error) {
      // Display alert informing of incorrect email format in list.
      alert(error);
    }
  };

  validateEmail(address) {
    //   Validate correct email format
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(address)) {
      return true;
    } else {
      // Informs which entry is the problem
      throw new Error(`Invalid email: ${address}`);
    }
  }

  postEmails = async (array) => {
    //   Set variables
    let userId = localStorage.userId;
    let hash = this.props.match.params.hash;
    let api_url = `${process.env.REACT_APP_API_URL}/users/${userId}/units/${hash}/invite`;
    let data = JSON.stringify({
      unit: {
        invite_list: array,
      },
    });

    // Compose axios request
    let config = {
      method: "post",
      url: api_url,
      headers: {
        Authorization: "Bearer " + localStorage.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    // Send emails, raise alert on network or api fail.
    try {
      const response = await axios(config);

      if (response.status === 204) {
        alert("Email invites successfully sent");
        this.setState({ emailsValue: "" });
      } else {
        throw new Error(
          `Messages not sent!\nError: ${response.status}\n${response.statusText}\n${response.data}`
        );
      }
    } catch (error) {
      alert(error);
    }
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

  render() {
    const render = localStorage.userId === localStorage.projectOwnerId;

    return (
      <div className="side-content-container p-4">
        {render && (
          <div className="p-4 global-form-container">
            <h2 className="text-center">ADD USER</h2>
            {this.renderAddUserForm()}
          </div>
        )}
      </div>
    );
  }
}

export default AddUser;
