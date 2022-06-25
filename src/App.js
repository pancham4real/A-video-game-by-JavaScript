import "./App.css";
import Navbar from "./Components/Navbar";

import React, { Component } from "react";
import News from "./Components/News";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";

export default class App extends Component {
  // getName = () => {
  //   console.log("hiiii");
  // };
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News key={"Home"} pageSize={5} country="in" category="Home" />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  key={"business"}
                  pageSize={5}
                  country="in"
                  category="business"
                />
              }
            />
            {/* <Route
              path="/business"
              element={<News pageSize={5} country="in" category="business" />}
            /> */}
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  pageSize={5}
                  key={"entertainment"}
                  country="in"
                  category="entertainment"
                />
              }
            />
            {/* <Route
              path="/health"
              element={<News pageSize={5} country="in" category="health" />}
            /> */}
            <Route
              path="/science"
              element={
                <News
                  pageSize={5}
                  country="in"
                  category="science"
                  // callBackFunction={() => this.getName()}
                />
              }
            />
            <Route
              path="/sports"
              element={<News pageSize={5} country="in" category="sports" />}
            />
            <Route
              path="/technology"
              element={<News pageSize={5} country="in" category="technology" />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}
