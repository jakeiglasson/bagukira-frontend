import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/Login.css";
import "./css/Global.css";

class Login extends Component {
  state = { email: "", password: "", errMessage: "" };

  parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  handleSubmit = () => {
    let { email, password } = this.state;
    axios
      .post(process.env.REACT_APP_API_URL + "/login", {
        auth: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.jwt);
        let userId = this.parseJwt(localStorage.getItem("token")).sub;
        localStorage.setItem("userId", userId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  render() {
    let { email, password, errMessage } = this.state;
    return (
      <div className="small-centered-card">
        <h3 className="text-center mb-3">LOGIN</h3>
        <Form>
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
              We'll never share your email with anyone else... Unless they pay
              us alot, alot, alot of money (sorry)
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
          </Form.Group>

          <Link
            to="/projects"
            className="text-link"
            data-testid="login"
            onClick={this.handleSubmit.bind(this)}
          >
            <Button className="btn btn-block">LOGIN</Button>
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
