import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/Login.css";
import "./css/Global.css";
import { inputEventState } from "./shared/Helpers.jsx";
import axios from "axios";

class Signup extends Component {
  state = { email: "", password: "", confirmPassword: "" };

  validateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      alert("Invalid email");
      return false;
    }
  }

  parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  handleSubmit = async () => {
    let { email, password, confirmPassword } = this.state;
    let login = false;

    // check if email is valid
    try {
      if (this.validateEmail(email)) {
        // check if password and confirmPassword match
        if (password === confirmPassword) {
          // create new account
          const response = await axios.post(
            process.env.REACT_APP_API_URL + "/sign-up",
            {
              user: {
                email: email,
                password: password,
              },
            }
          );
          const { status } = response;
          if (status === 201) {
            login = true;
          } else if (status === 422) {
            alert("User already exists");
          } else {
            throw new Error("Error: Something went wrong");
          }

          // login the new user if account is successfully created
          if (login) {
            const response = await axios.post(
              process.env.REACT_APP_API_URL + "/login",
              {
                auth: {
                  email: email,
                  password: password,
                },
              }
            );

            const { status, data } = response;
            if (status === 201) {
              localStorage.setItem("token", data.jwt);

              const userId = this.parseJwt(localStorage.getItem("token")).sub;
              localStorage.setItem("userId", userId);

              this.props.history.push("/projects");
              window.location.reload(true);
            } else {
              throw new Error("Error: Couldn't log in :(");
            }
          }
        } else {
          throw new Error("Passwords don't match");
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  onInputChange = (event) => inputEventState(this, event);

  render() {
    return (
      <div className="small-centered-card ">
        <h3 className="text-center mb-3">SIGN UP</h3>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onInputChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Button
            className="btn btn-warning btn-block"
            data-testid="login"
            onClick={this.handleSubmit}
          >
            REGISTER
          </Button>
          <hr />
          <div className="">Already have an account?</div>
          <Link to="/login" className="text-link">
            <Button className="btn btn-block" data-testid="signup">
              LOGIN
            </Button>
          </Link>
        </Form>
      </div>
    );
  }
}

export default Signup;
