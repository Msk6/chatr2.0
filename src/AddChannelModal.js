import React, { useState, Component } from "react";

import ChannelForm from "./ChannelForm";
import Modal from '@material-ui/core/Modal';
import 'react-responsive-modal/styles.css';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { pink,grey } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  pink:{
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  modal:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  sidebar:{
    marginTop: 30,
  }
}))

const AddChannelModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return(
    <div>
      <Modal open={open} onClose={closeModal} className={classes.modal} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <ChannelForm closeModal={closeModal} />
      </Modal>
      <ListItem button onClick={openModal} className={classes.sidebar}>
        <ListItemIcon><Avatar className={classes.pink}><AddIcon style={{ fontSize: 40 }}/></Avatar></ListItemIcon>
      </ListItem>
    </div>
  )
}

export default AddChannelModal;
