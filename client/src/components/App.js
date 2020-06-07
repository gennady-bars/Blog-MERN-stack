import React from "react";
import { Switch, Route } from "react-router-dom";
import Posts from "./Posts/Posts";
import NotFound from "./NotFound/NotFound";
import Navbar from "./Navbar/Navbar";
import Login from "./Login/Login";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
