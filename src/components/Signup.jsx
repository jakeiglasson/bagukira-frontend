import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/Login.css";
import "./css/Global.css";

class signup extends Component {
  handleSubmit = () => {};

  render() {
    return (
      <div className="small-centered-card ">
        <h3 className="text-center mb-3">SIGN UP</h3>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control type="password" placeholder="Re-enter Password" />
          </Form.Group>
          {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <Link to="/projects" className="text-link">
            <Button className="btn btn-warning btn-block" data-testid="login">
              REGISTER
            </Button>
          </Link>
          <hr />
          <div className="">Already have an account?</div>
          <Link to="/login" className="text-link">
            <Button className="btn btn-block" data-testid="signup">
              Login
            </Button>
          </Link>
        </Form>
      </div>
    );
  }
}

export default signup;
