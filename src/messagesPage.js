import React from "react";
import { connect } from "react-redux";
import { fetchMessages } from "./redux/actions";
import MessageForm from "./MessageForm";
// import { useParams } from "react-router-dom";
function messagesPage(props) {
  // const { channelID } = useParams();
  const meassages = props.messages.map((message) => {
    return (
      <div>
        <h5 className="card-title">
          <p>
            {message.username}:{message.message}
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
