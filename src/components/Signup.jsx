import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/Login.css";
import "./css/Global.css";
import { inputEventState } from "./shared/Helpers.jsx";
import axios from "axios";

class signup extends Component {
  state = { email: "", password: "", confirmPassword: "" };

  validateEmail(mail) {
    console.log(mail);
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
    // UserId needs to be dynamically set when user login functionality is working. Setting as a placeholder for now
    // localStorage.setItem("userId", 1);
    // localStorage.setItem("userEmail", "jake@gmail.com");

    let { email, password, confirmPassword } = this.state;
    let login = false;

    // check if email is valid
    if (this.validateEmail(email)) {
      // check if password and confirmPassword match
      if (password === confirmPassword) {
        // create new account
        console.log("passwords match");
        await axios
          .post(process.env.REACT_APP_API_URL + "/sign-up", {
            user: {
              email: email,
              password: password,
            },
          })
          .then((response) => {
            console.log(response);
            login = true;
          })
          .catch((error) => {
            if (error.response.status) {
              alert("User already exists");
            }
          });
        // login the new user if account is successfully created
        if (login) {
          await axios
            .post(process.env.REACT_APP_API_URL + "/login", {
              auth: {
                email: email,
                password: password,
              },
            })
            .then((response) => {
              // console.log(response);
              localStorage.setItem("token", response.data.jwt);

              const userId = this.parseJwt(localStorage.getItem("token")).sub;
              localStorage.setItem("userId", userId);

              // console.log(localStorage);

              this.props.history.push("/projects");
              window.location.reload(true);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        alert("passwords don't match");
      }
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
          {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}

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

export default signup;
