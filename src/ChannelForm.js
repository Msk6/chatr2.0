import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { addChannel } from "./redux/actions/index";

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import { grey } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  formWindow: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
  },
  root: {
    '& .MuiTextField-root':{
      margin: theme.spacing(1),
      width: "25ch",
      color: theme.palette.getContrastText(grey[900]),
      backgroundColor: grey[900],
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    align: "center",
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
    <div className={classes.formWindow}>
      <form onSubmit={submitChannel} className={classes.root}>
        <div className="input-group mb-3">
          <TextField required id="name" label="name field" type="text" className="form-control" name="name" onChange={textChangeHandler}/>
        </div>
        <div className="input-group mb-3">
          <TextField id="image_url" label="image field" type="text" className="form-control" name="image_url" onChange={textChangeHandler}/>
        </div>
        <Button variant="contained" type="submit" className={classes.submit}>Add</Button>
      </form>
    </div>
  )
};

const mapDispatchToProps = dispatch => {
  return {
    addChannel: (newChannel,closeModal) => dispatch(addChannel(newChannel,closeModal))
  }
}

export default connect(null,mapDispatchToProps)(ChannelForm);
