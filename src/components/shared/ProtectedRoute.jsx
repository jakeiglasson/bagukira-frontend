import React from "react";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";

class ProtectedRoute extends React.Component {
  state = {
    auth: false,
    loading: true,
  };

  componentDidMount = async () => {
    const token = await localStorage.getItem("token");
    this.authenticated(token);
  };

  authenticated = async (token) => {
    if (token && window.location.href.includes(this.props.path)) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { status } = await response;

        if (status === 100) {
          this.setState({
            auth: true,
            loading: false,
          });
        } else if (status === 401) {
          this.setState({
            auth: false,
            loading: false,
          });
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  render() {
    const { loading, auth } = this.state;

    if (!loading && !auth) {
      //   const { Component } = this.state;
      return (
        <>
          <Redirect to="/login" />
        </>
      );
    } else {
      return (
        !loading && (
          <Route
            exact={this.props.exact}
            path={this.props.path}
            component={this.props.component}
          />
        )
      );
    }
  }
}

export default ProtectedRoute;
