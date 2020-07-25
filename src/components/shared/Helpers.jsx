import axios from "axios";

export const GetTime = (params) => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  return dateTime;
};

export const checkForCorrectLoggedInUser = (
  component,
  setPermission,
  redirect
) => {
  let match = false;
  console.log(
    component.props.serverRootUrl + "/projects?userId=" + localStorage.userId
  );
  if (localStorage.userEmail) {
    axios
      .get(
        // get all projects that belong to the logged in user

        component.props.serverRootUrl +
          "/projects?userId=" +
          localStorage.userId
      )
      .then((response) => {
        // iterate though each of those projects, checking if the current hash matches one of the users projects hash
        console.log("component:", component);
        console.log("response:", response);
        response.data.forEach((project) => {
          if (project.hashId == component.state.hash) {
            console.log("match!");
            match = true;
          } else {
            console.log("no match");
            return false;
          }
        });
      })
      .then(() => {
        if (match && setPermission) {
          console.log(match);
          component.setState({ permission: true }, () => {
            console.log("match, setPermission:", setPermission);
            console.log(component.state);
          });
        } else if (match == false && redirect) {
          console.log(match);
          component.setState({ redirect: true }, () => {
            console.log("no match, redirect:", redirect);
            console.log(component.state);
          });
        } else if (match && redirect) {
          component.setState({ redirect: false, render: true }, () => {
            console.log("match, redirect:", redirect);
            console.log(component.state);
          });
        }
      });
  }
};
