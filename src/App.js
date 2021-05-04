import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Form from "./components/Form";
import Head from "./components/Head";
import Doctors from "./components/Doctors";
import Login from "./components/Login";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Head />
      <Switch>
        <Route exact path="/" component={Doctors} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/doctor's-panel" component={Doctors} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
