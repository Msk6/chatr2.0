import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchMessages, startTimer, stopTimer } from "./redux/actions";
import MessageForm from "./MessageForm";
import { useParams } from "react-router-dom";


function MessagesPage(props) {
  const { channelID } = useParams();
  // const getLatestMessages = () => {
  //   let time = Date.now - 3000 
  //   console.log(time)
  //   props.updateMesages(time, channelID)
  // }

  //let timer = setInterval(getLatestMessages, 3000)
  
  useEffect(() => {
    props.fetchMessages(channelID);
    props.stopTimer()
    props.startTimer(channelID)
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
  //updateMesages: (time, channelID) => dispatch(updateMesages((time, channelID))),
  startTimer: (channelID) => dispatch(startTimer(channelID)), 
  stopTimer: () => dispatch(stopTimer())
  
});
export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
