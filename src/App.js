import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export default class App extends Component {
  API_KEY = process.env.REACT_APP_NEWS_APIKEY
  constructor() {
    super();
    this.state = { country: "in" , progress:10};
  }
  setNewsCountry = (country) => {
    this.setState({ country: country });
  };

  onSetProgress= (progress)=>{
    this.setState({
      progress:progress
    })
  }
  render() {
    return (
      <Router>
        <div>
          <NavBar onCountryChange={this.setNewsCountry} />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            height={3}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News apikey={this.API_KEY}  setProgress = {this.onSetProgress}
                  key={`general${this.state.country}`}
                  pageSize={15}
                  country={this.state.country}
                  category="general"
                />
              }
            ></Route>
            <Route
              exact
              path="/technology"
              element={
                <News apikey={this.API_KEY}  setProgress = {this.onSetProgress}
                  key={`technology${this.state.country}`}
                  pageSize={15}
                  country={this.state.country}
                  category="technology"
                />
              }
            ></Route>
            <Route
              exact
              path="/business"
              element={
                <News apikey={this.API_KEY}  setProgress = {this.onSetProgress}
                  key={`business${this.state.country}`}
                  pageSize={15}
                  country={this.state.country}
                  category="business"
                />
              }
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={
                <News apikey={this.API_KEY}  setProgress = {this.onSetProgress}
                  key={`entertainment${this.state.country}`}
                  pageSize={15}
                  country={this.state.country}
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              exact
              path="/general"
              element={
                <News apikey={this.API_KEY}  setProgress = {this.onSetProgress}
                  key={`general${this.state.country}`}
                  pageSize={15}
                  country={this.state.country}
                  category="general"
                />
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={
                <News apikey={this.API_KEY}  setProgress = {this.onSetProgress}
                  key={`health${this.state.country}`}
                  pageSize={15}
                  country={this.state.country}
                  category="health"
                />
              }
            ></Route>
            <Route
              exact
              path="/science"
              element={
                <News apikey={this.API_KEY}  setProgress = {this.onSetProgress}
                  key={`science${this.state.country}`}
                  pageSize={15}
                  country={this.state.country}
                  category="science"
                />
              }
            ></Route>
            <Route
              exact
              path="/sports"
              element={
                <News apikey={this.API_KEY}  setProgress = {this.onSetProgress}
                  key={`sports${this.state.country}`}
                  pageSize={15}
                  country={this.state.country}
                  category="sports"
                />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}
