import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./css/NewBug.css";
import "./css/Global.css";

class AddUser extends Component {
  render() {
    return (
      <div className="side-content-container p-4">
        <div className="p-4 global-form-container">
          <h2 className="text-center">ADD USER</h2>
          <Form>
            <p>
              INSTRUCTIONS ON ADDING USERS GOES HERE: Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.{" "}
            </p>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>USER EMAILS</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default AddUser;
