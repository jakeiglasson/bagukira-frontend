import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./css/NewBug.css";
import "./css/Global.css";

class EditProject extends Component {
  render() {
    return (
      <div className="side-content-container p-4">
        <div className="p-4 global-form-container">
          <h2 className="text-center">EDIT PROJECT</h2>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>PROJECT NAME</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="PROJECT NAME" />
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

export default EditProject;
