import React, { useState } from "react";
import { connect } from "react-redux";
import { PostMessages } from "./redux/actions";

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
    <div className="col-12">
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField required id="message" value={message} name="message" label="message field" type="text" name="message" className="form-control" onChange={handleChange}/>
      </form>
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
