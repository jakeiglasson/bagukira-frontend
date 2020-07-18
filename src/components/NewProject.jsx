import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class NewProject extends Component {
  render() {
    return (
      <div className="medium-centered-card">
        <h1 className="text-center m-3">NEW PROJECT</h1>
        <div className="new-project-form-container">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>PROJECT NAME</Form.Label>
              <Form.Control type="email" placeholder="PROJECT NAME" />
            </Form.Group>
            <Link to="/projects/p/1" className="text-link">
              <Button className="btn btn-block" data-testid="submit">
                SUBMIT
              </Button>
            </Link>
            <hr />
            <Link to="/projects" className="text-link">
              <Button
                className="btn btn-warning btn-block"
                data-testid="signup"
              >
                BACK
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    );
  }
}

export default NewProject;
