import React, { useState } from "react";
import { connect } from "react-redux";
import { PostMessages } from "./redux/actions";

import Alert from "./Alert";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const MessageForm = (props) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState({
    message: "",
  });
  const resetValue = () => {
    setUserData({ message: "" });
  };
  const handleChange = (event) =>
    setUserData({ ...userData, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userData.message === "!hello-bot") {
      alert("Hello there human!");
    } else if (userData.message === "!joke-bot") {
      setData(userData.message);
      setModal(true);
    } else if (
      userData.message === "hahaha" ||
      userData.message === "crying" ||
      userData.message === "hello" ||
      userData.message === "winner" ||
      userData.message === "happy"
    ) {
      setData(userData.message);
      setModal(true);
      props.PostMessages(props.channelID, userData);
    } else if (userData.message === "hru") {
      props.PostMessages(props.channelID, { message: "How are you?" });
    } else if (userData.message === "np") {
      props.PostMessages(props.channelID, { message: "no problem!" });
    } else if (userData.message === "tyt") {
      props.PostMessages(props.channelID, { message: "take your time" });
    } else if (userData.message === "ty") {
      props.PostMessages(props.channelID, { message: "thank you" });
    } else if (userData.message === "tbh") {
      props.PostMessages(props.channelID, { message: "to be honest" });
    } else if (userData.message === "tc") {
      props.PostMessages(props.channelID, { message: "take care" });
    } else {
      props.PostMessages(props.channelID, userData);
    }
    resetValue();
  };

  const { message } = userData;

  return (
    <div className="col-6 mx-auto">
      <div className="card my-5">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <input
                type="text"
                className="form-control"
                id="message"
                value={message}
                name="message"
                placeholder="message"
                onChange={handleChange}
              />
            </div>
          </form>
          <Modal open={modal} onClose={() => setModal(false)} center>
            <Alert message={data} />
          </Modal>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ channels, messages }) => ({ channels, messages });
const mapDispatchToProps = (dispatch) => {
  return {
    PostMessages: (channelID, userData) =>
      dispatch(PostMessages(channelID, userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
