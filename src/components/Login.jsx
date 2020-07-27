import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./css/Login.css";
import "./css/Global.css";

class Login extends Component {
  state = { email: "", password: "", errMessage: "" };

  handleSubmit = () => {
    // UserId needs to be dynamically set when user login functionality is working. Setting as a placeholder for now
    // localStorage.setItem("userId", 1);
    // localStorage.setItem("userEmail", "jake@gmail.com");
    let { email, password } = this.state;
    Axios.post(process.env.REACT_APP_API_URL + "/login", {
      auth: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.jwt);
        console.log(localStorage);
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
          {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
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

// class Login extends React.Component {
//   state = { email: "", password: "", errMessage: "" };

//   onInputChange = (event) => {
//     const key = event.target.id;
//     this.setState({
//       [key]: event.target.value,
//     });
//   };

//   onFormSubmit = async (event) => {
//     event.preventDefault();
//     const { email, password } = this.state;
//     const body = {
//       auth: { email, password },
//     };
//     try {
//       const response = await fetch("http://localhost:3000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });
//       if (response.status >= 400) {
//         throw new Error("incorrect credentials");
//       } else {
//         const { jwt } = await response.json();
//         localStorage.setItem("token", jwt);
//         this.props.history.push("/secrets");
//       }
//     } catch (err) {
//       this.setState({
//         errMessage: err.message,
//       });
//     }
//   };

//   render() {
//     const { email, password, errMessage } = this.state;
//     return (
//       <div className="container">
//         <h1>Login</h1>
//         {errMessage && <span>{errMessage}</span>}
//         <form onSubmit={this.onFormSubmit}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             value={email}
//             onChange={this.onInputChange}
//           />
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             value={password}
//             onChange={this.onInputChange}
//           />
//           <input type="submit" value="Submit" />
//         </form>
//       </div>
//     );
//   }
// }

// export default Login;
