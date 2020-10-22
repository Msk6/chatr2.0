import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PostMessages } from "./redux/actions";

//Emoji
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const MessageForm = (props) => {
  const [viewEmojis, setViewEmojis] = useState(false)
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
    props.PostMessages(props.channelID, userData);
    resetValue();
  };

  

  const { message } = userData;

  const addEmoji = emojiObj => {
    let emoji = emojiObj.native
    setUserData({...userData, message: message+emoji})
  }

  const handleViewEmojis = () =>{
    setViewEmojis(!viewEmojis)
  }
  

  return (
    <div className="col-6 mx-auto">
      <div className="card my-5">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <div className="input-group">
                <div className="input-group-append">
                <button className="btn btn-outline-secondary" onClick={handleViewEmojis}>emojis</button>
                </div>
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
            </div>
            <button type="submit" className="btn btn-primary">
              send
            </button>
          </form>
          {
          viewEmojis?
          <span>
          <Picker onSelect={addEmoji}/>
          </span>:null
          }
          
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    PostMessages: (channelID, userData) =>
      dispatch(PostMessages(channelID, userData)),
  };
};

export default connect(null, mapDispatchToProps)(MessageForm);
