import React from "react";
import { Divider } from "antd";
import AddUser from "./components/AddUser";
import ListUsers from "./components/ListUsers";

const App = () => {
  return (
    <div>
      <ListUsers />
      <Divider />
      <AddUser />
      <Divider />
      Edit users
      <Divider />
      Delete users
      <Divider />
      Add user to groups
      <Divider />
      Add roles to user
      <Divider />
      Add other random attribute on the user (extra parameters, be creative)
      <Divider />
    </div>
  );
};

export default App;
