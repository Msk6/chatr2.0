import React, { useState } from "react";
import { connect } from "react-redux";

import { addChannel } from "./redux/actions/index";

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import { grey,pink } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  formWindow: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
  },
  root: {
    '& .MuiTextField-root':{
      margin: theme.spacing(1),
      color: theme.palette.getContrastText(grey[900]),
      backgroundColor: grey[900],
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    align: "center",
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  }
}))

const ChannelForm = ({addChannel,closeModal}) => {
  const classes = useStyles();
  const [channel, setChannel] = useState({
    name:"",
    image_url:"",
  })

  const textChangeHandler = (event) => {
    setChannel({ ...channel, [event.target.name]: event.target.value });
  }

  const submitChannel = (event) => {
    event.preventDefault();
    addChannel(channel, closeModal);
  }

  return (
      <form onSubmit={submitChannel} className={classes.root}>
          <TextField fullWidth required id="name" label="Channel Name" type="text" className="form-control" name="name" onChange={textChangeHandler}/>
          <TextField fullWidth id="image_url" label="Image url" type="text" className="form-control" name="image_url" onChange={textChangeHandler}/>
        <Button fullWidth variant="contained" type="submit" className={classes.submit}>Add</Button>
      </form>
  )
};

const mapDispatchToProps = dispatch => {
  return {
    addChannel: (newChannel,closeModal) => dispatch(addChannel(newChannel,closeModal))
  }
}

export default connect(null,mapDispatchToProps)(ChannelForm);
