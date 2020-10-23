import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PostMessages } from "./redux/actions";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import Alert from "./Alert";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root':{
      margin: theme.spacing(1),
      width: "225ch",
      color: theme.palette.getContrastText(grey[900]),
      backgroundColor: grey[900],
    }
  },
}))


const MessageForm = (props) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null);
  const [viewEmojis, setViewEmojis] = useState(false);

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

  const addEmoji = (emojiObj) => {
    let emoji = emojiObj.native;
    setUserData({ ...userData, message: message + emoji });
  };

  const handleViewEmojis = () => {
    setViewEmojis(!viewEmojis);
  };

  return (

    <div className="col-12">
      <div className="card my-5">
        <div className="card-body">
          <form onSubmit={handleSubmit} className={classes.root}>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <div className="input-group">
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleViewEmojis}
                  >
                    emojis
                  </button>
                </div>
                <TextField required id="message" value={message} name="message" label="message field" type="text" name="message" className="form-control" onChange={handleChange}/>
              </div>{" "}
            </div>
          </form>
          <Modal open={modal} onClose={() => setModal(false)} center>
            <Alert message={data} />
          </Modal>

          {viewEmojis ? (
            <span>
              <Picker onSelect={addEmoji} />
            </span>
          ) : null}
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
