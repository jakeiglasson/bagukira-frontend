import React from "react";
import { Route } from "react-router-dom";

import axios from "axios";

class ProtectedRoute extends React.Component {
  state = {
    auth: false,
    loading: true,
  };

  componentWillMount = async () => {
    this.setState({ Component: this.props.component });

    if (window.location.href.includes(this.props.path)) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/status/user`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status >= 400) {
          throw new Error("not authorized");
        } else {
          this.setState({
            auth: true,
            loading: false,
          });
        }
      } catch (err) {
        this.setState({
          loading: false,
        });
      }
    }
  };

  render() {
    const { loading, auth } = this.state;

    if (!loading && !auth) {
      const { Component } = this.state;
      return (
        <>
          <Route
            exact={this.props.exact}
            path={this.props.path}
            render={(props) => <Component {...props} authorized={false} />}
          />
        </>
      );
    } else {
      return (
        !loading && (
          <>
            <Route
              exact={this.props.exact}
              path={this.props.path}
              component={this.props.component}
            />
          </>
        )
      );
    }
  }
}

export default ProtectedRoute;
