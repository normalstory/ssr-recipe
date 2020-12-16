import React from "react";
import { Route } from "react-router-dom";
import BluePages from "./pages/BluePages";
import RedPage from "./pages/RedPage";
import Menu from "./components/Menu";

const App = () => {
  return (
    <div>
      <Menu />
      <hr />
      <Route path="/red" component={RedPage} />
      <Route path="/blue" component={BluePages} />
    </div>
  );
};

export default App;
