import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { Fragment } from "react";
import Home from "./components/pages/Home";
import About from "./components/pages/About";

const App = () => {
  return (
    <Router>
      <Fragment className="App">
        <Navbar />
        <div class="container">
          <switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/about" component={About}></Route>
          </switch>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
