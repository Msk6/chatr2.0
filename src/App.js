import React from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import MessagesPage from "./messagesPage";

function App({ user }) {
  return (
    <div>
      {user ? (
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <Route path="/messages/:channelID">
              <MessagesPage />
            </Route>
          </div>
        </div>
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
