import React, { useState } from "react";
import { connect } from "react-redux";
import { PostMessages } from "./redux/actions";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Alert from "./Alert";
import Modal from '@material-ui/core/Modal';
import "react-responsive-modal/styles.css";
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root':{
      margin: theme.spacing(1),
      marginTop: theme.spacing(50),
      width: "225ch",
      color: theme.palette.getContrastText(grey[900]),
      backgroundColor: grey[900],
    }
  },
  modal:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))


const MessageForm = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(false)
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const addEmoji = (emojiObj) => {
    let emoji = emojiObj.native;
    setUserData({ ...userData, message: message + emoji });
  };

  return (

    <div className="col-12">
          <FormControl fullWidth className={classes.root}>
            <form onSubmit={handleSubmit}>
              <Input fullWidth
                required
                id="message"
                value={message}
                name="message"
                label="message"
                type="text"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-describedby={id} onClick={handleClick}>
                      <EmojiEmotionsIcon/>
                    </IconButton>
                  </InputAdornment>
                }/>
            </form>
          </FormControl>
          <Modal className={classes.modal} open={modal} onClose={() => setModal(false)} >
            <Alert message={data} />
          </Modal>

            <Popover
              id={id}
              open={open}
              onClose={() => setAnchorEl(false)}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              >
              <Picker onSelect={addEmoji} theme="dark" />
            </Popover>

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
