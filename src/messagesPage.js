import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { fetchMessages, startTimer, stopTimer, scrollToBottom } from "./redux/actions";
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
import { grey,pink } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { animateScroll } from "react-scroll";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: theme.spacing(10),
    marginLeft: 5,
    marginTop: 90,
    right:0,
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
    marginTop: theme.spacing(100),
    top: 'auto',
    bottom: 0,
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
  },
  inline: {
    display: 'inline',
    marginLeft: theme.spacing(5)
  },
  you: {
    color: pink[500],
  },
  them: {
    color: pink[100],
  }
}))



function MessagesPage(props) {
  const classes = useStyles();
  const { channelID } = useParams();

  const bottomRef = useRef(null)
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      block:"start",
    })
    // animateScroll.scrollToBottom({
    //   containerId: "cont"
    // })
    // messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

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
    scrollToBottom()
  }, [channelID]);

  useEffect(() => {

    scrollToBottom()
  }, []);


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
      <ListItem fullWidth button>
      {isUrl(message.message)?(<>
        <ListItemText primary={props.user.username == message.username ? <React.Fragment><h5><b className={classes.you}>You</b></h5></React.Fragment> : <React.Fragment><h5><b className={classes.them}>{message.username}</b></h5></React.Fragment>}/>
        <img src={message.message}/>
        </>):
          <ListItemText primary={props.user.username == message.username ? <React.Fragment><h5><b className={classes.you}>You</b></h5></React.Fragment> : <React.Fragment><h5><b className={classes.them}>{message.username}</b></h5></React.Fragment>} secondary={<React.Fragment>
          <Typography
            component="span"
            variant="h5"
            className={classes.inline}
            color="textPrimary"
            >
              {message.message}
          </Typography>
          </React.Fragment>}/>
    }

      </ListItem>
      <Divider component="li" />
      </>
    );
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <div ref={bottomRef} id="cont">
      <List ref={bottomRef} id="cont" fullWidth className={classes.paper}>
        {meassages}
      </List>
      </div>
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

  scrollToBottom: () => dispatch(scrollToBottom())

});
export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
