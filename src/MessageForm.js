import React, { useState } from "react";
import { connect } from "react-redux";
import { PostMessages } from "./redux/actions";

const MessageForm = (props) => {
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

            <button type="submit" className="btn btn-primary">
              send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
// const mapStateToProps = ({ channels }) => ({ channels });
const mapDispatchToProps = (dispatch) => {
  return {
    PostMessages: (channelID, userData) =>
      dispatch(PostMessages(channelID, userData)),
  };
};

export default connect(null, mapDispatchToProps)(MessageForm);
