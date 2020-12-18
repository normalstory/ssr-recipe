import React from "react";
import UsersContainers from "../containers/UsersContainers";

//+saga
import UserContainers from "../containers/UserContainers";
import { Route } from "react-router-dom";

const UsersPage = () => {
  return (
    <>
      <UsersContainers />
      <Route
        path="/users/:id"
        render={({ match }) => <UserContainers id={match.params.id} />}
      />
    </>
  );
};

export default UsersPage;
