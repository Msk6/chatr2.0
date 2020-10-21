import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchMessages } from "./redux/actions";
import MessageForm from "./MessageForm";
import { useParams } from "react-router-dom";
function MessagesPage(props) {
  const { channelID } = useParams();

  useEffect(() => {
    props.fetchMessages(channelID);
  }, [channelID]);

  const meassages = props.messages.map((message) => {
    return (
      <div>
        <h5 className="card-title">
          <p>
            {props.user.username == message.username ? "You" : message.username}
            :{message.message}
          </p>
        </h5>
      </div>
    );
  });

  return (
    <div className="border border-warning m-5">
      <h1>Messages: </h1>
      {meassages}
      <hr></hr>
      <MessageForm channelID={channelID} />
    </div>
  );
}

const mapStateToProps = ({ messages, channels, user }) => ({
  messages,
  channels,
  user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: (channelID) => dispatch(fetchMessages(channelID)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
