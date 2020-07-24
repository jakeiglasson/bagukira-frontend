import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/Login.css";
import "./css/Global.css";

class Login extends Component {
  handleSubmit = () => {
    // UserId needs to be dynamically set when user login functionality is working. Setting as a placeholder for now
    localStorage.setItem("userId", 1);
    localStorage.setItem("userEmail", "jake@gmail.com");
  };

  render() {
    return (
      <div className="small-centered-card">
        <h3 className="text-center mb-3">LOGIN</h3>
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
          {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <Link
            to="/projects"
            className="text-link"
            onClick={this.handleSubmit.bind(this)}
          >
            <Button className="btn btn-block" data-testid="login">
              LOGIN
            </Button>
          </Link>
          <hr />
          <Link to="/signup" className="text-link">
            <Button className="btn btn-warning btn-block" data-testid="signup">
              SIGNUP
            </Button>
          </Link>
        </Form>
      </div>
    );
  }
}

export default Login;
