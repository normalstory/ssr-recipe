import React from "react";
import { Route } from "react-router-dom";
import BluePages from "./pages/BluePages";
import RedPage from "./pages/RedPage";
import Menu from "./components/Menu";
import UsersPage from "./pages/UsersPage";

const App = () => {
  return (
    <div>
      <Menu />
      <hr />
      <Route path="/red" component={RedPage} />
      <Route path="/blue" component={BluePages} />
      <Route path="/users" component={UsersPage} />
    </div>
  );
};

export default App;
