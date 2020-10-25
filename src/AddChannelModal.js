import React, { useState } from "react";
import ChannelForm from "./ChannelForm";
import 'react-responsive-modal/styles.css';
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from "@material-ui/core/styles";
import { pink } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
      <ListItem button onClick={openModal} className={classes.sidebar}>
        <ListItemIcon><Avatar className={classes.pink}><AddIcon style={{ fontSize: 40 }}/></Avatar></ListItemIcon>
      </ListItem>
      <Dialog open={open} onClose={closeModal} className={classes.modal} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Add a Channel</DialogTitle>
        <DialogContent>

          <ChannelForm closeModal={closeModal} />
        </DialogContent>


      </Dialog>

    </div>
  )
}

export default AddChannelModal;
