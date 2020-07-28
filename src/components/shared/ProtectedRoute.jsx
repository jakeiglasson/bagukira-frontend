import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

class ProtectedRoute extends React.Component {
  state = {
    auth: false,
    loading: true,
  };

  componentDidMount = async () => {
    console.log(this.props.path);
    console.log("http://localhost:3000" + this.props.path);
    if (window.location.href == "http://localhost:3000" + this.props.path) {
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
          console.log(response);
          this.setState({
            auth: true,
            loading: false,
          });
        }
      } catch (err) {
        console.log(err.message);
        this.setState({
          loading: false,
        });
      }
    }
  };

  render() {
    const { loading, auth } = this.state;
    if (!loading && !auth) {
      console.log("REDIRECTING USER", this.props.component);
      return <Redirect to="/" />;
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
