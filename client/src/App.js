import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Login from "./components/layouts/Login";
import Signup from "./components/layouts/Register";
import Profile from "./components/Profile/Profile";
import Staff from "./components/Profile/Staff";
import StaffDetails from "./components/Profile/EditStaff";
import ViewStaff from "./components/Profile/ViewStaff";


class App extends Component {
  state = {};

  render() {
    return (
      <BrowserRouter>
        <div className="app wrapper" id="wrapper" >
          <Navbar />
          <Route exact path="/" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Signup} />
          <Route exact path="/staff" component={Staff} />
          <Route exact path="/edit-staff/:id" component={StaffDetails} />
          <Route exact path="/view-staff/:id" component={ViewStaff} />


        </div>
      </BrowserRouter>
    );
  }
}

export default App;
