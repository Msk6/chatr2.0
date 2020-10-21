import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchMessages } from "./redux/actions";
import MessageForm from "./MessageForm";
import { useParams } from "react-router-dom";
function messagesPage(props) {
  // const { channelID } = useParams();
  const meassages = props.messages.map((message) => {
    return (
      <div>
        <h5 className="card-title">
          <p>
            {message.username}:{message.message}
          </p>
          {/* <p>Id: {message.id}</p>
          <p>Username: {message.username}</p> */}
        </h5>
      </div>
    );
  });

  return (
    <div className="border border-warning m-5">
      <h1>Messages: </h1>
      {/* {props.fetchMessages().map((message) => (
        <div>
          <h1>hh</h1>
          {message.id}
          {message.message}
        </div>
      ))} */}
      {meassages}
      <hr></hr>
      <MessageForm />
    </div>
  );
}

const mapStateToProps = ({ messages }) => ({
  messages,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: (id) => dispatch(fetchMessages(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(messagesPage);
