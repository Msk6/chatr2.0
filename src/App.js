import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Logout from "./components/Logout";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import MessagesPage from "./messagesPage";

function App({ user }) {
  return (
    <div>
      {user ? (
        <>
        <Sidebar />
        <MessagesPage />
        </>
      ) : (
        // <MessagesPage />
        <>
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/signup">
              <SignupForm />
            </Route>
            <Route path="/messages/">
              <MessagesPage />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  console.log(user);
  return {
    user,
  };
};

export default connect(mapStateToProps)(App);
