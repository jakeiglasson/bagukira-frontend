import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/Login.css";
import "./css/Global.css";
import { inputEventState } from "./shared/Helpers.jsx";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", errMessage: "" };
  }

  parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let { email, password } = this.state;
    await axios
      .post(process.env.REACT_APP_API_URL + "/login", {
        auth: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.jwt);

        const userId = this.parseJwt(localStorage.getItem("token")).sub;
        localStorage.setItem("userId", userId);
        localStorage.setItem("userEmail", email);

        this.props.history.push("/projects");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onInputChange = (event) => inputEventState(this, event);

  render() {
    let { email, password } = this.state;
    return (
      <div className="small-centered-card">
        <h3 className="text-center mb-3">LOGIN</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              id="email"
              value={email}
              onChange={this.onInputChange}
            />
            <Form.Text className="text-muted">
              You're email is confidential, we will never share your personal
              information without your permission.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={this.onInputChange}
            />

            <Button
              type="submit"
              className=" btn btn-block mt-3 btn-primary"
              data-testid="login"
            >
              LOGIN
            </Button>
          </Form.Group>

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
