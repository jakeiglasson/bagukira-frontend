import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

class home extends Component {
  render() {
    return (
      <div>
        <h1>Bagukira</h1>
        <Link to="/login">
          <button>LOGIN</button>
        </Link>
        <Link to="/signup">
          <button>SIGNUP</button>
        </Link>
      </div>
    );
  }
}

export default home;
