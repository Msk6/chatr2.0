import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchMessages, startTimer, stopTimer } from "./redux/actions";
import MessageForm from "./MessageForm";
import { useParams } from "react-router-dom";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  meassagesPage: {
    margin: 36,
  },
  send: {
    top:"auto",
    bottom: 0,
    zIndex: theme.zIndex.drawer + 1,
  },
  root: {
    display: "flex",
  },
  appBar: {
    paddingLeft: theme.spacing(10),
    paddingBottom: theme.spacing(3),
    top: 'auto',
    bottom: 0,
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
  },
}))



function MessagesPage(props) {
  const classes = useStyles();
  const { channelID } = useParams();

  // const getLatestMessages = () => {
  //   let time = Date.now - 3000
  //   console.log(time)
  //   props.updateMesages(time, channelID)
  // }

  //let timer = setInterval(getLatestMessages, 3000)

  const scrollToBottom = useScrollToBottom();

  useEffect(() => {
    props.fetchMessages(channelID);
    props.stopTimer()
    props.startTimer(channelID)
    scrollToBottom()
  }, [channelID]);


  function isUrl(text)
    {
//         let expression =  
// /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        let expression =  "https://" 
        let regex = new RegExp(expression); 
        let url = text; 
        return url.match(regex) ? true : false;

}
  

  const meassages = props.messages.map((message) => {
    return (
      <>
      <div>
        <h5 className="card-title">

          {isUrl(message.message)?(
            <img src={message.message}/>
          ):(
            <p>
            {props.user.username == message.username ? "You" : message.username}

            :{message.message}
          </p>
          )}
          
        </h5>

      </div>
      </>
    );
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>Messages</Typography>
        {meassages}
      </Paper>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <MessageForm channelID={channelID} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
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

  stopTimer: () => dispatch(stopTimer()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
