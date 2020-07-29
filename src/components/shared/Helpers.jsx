export const GetTime = (params) => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  return dateTime;
};

export const inputEventState = (thisObj, event) => {
  thisObj.setState({
    [event.target.id]: event.target.value,
  });
};
