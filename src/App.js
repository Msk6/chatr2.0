import React from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import MessagesPage from "./messagesPage";

function App({ user }) {
  return (
    <div>
      {user ? (
        <Route path="/">
          <div className="row">
            <Sidebar />
            <div className="col-11">
              <Route path="/messages/:channelID">
                <MessagesPage />
              </Route>
            </div>
          </div>
        </Route>
        
      ) : (
        <>
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/signup">
              <SignupForm />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(App);
