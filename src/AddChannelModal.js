import React, { useState, Component } from "react";

import ChannelForm from "./ChannelForm";
import Modal from "react-responsive-modal";
import 'react-responsive-modal/styles.css';


const AddChannelModal = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return(
    <div>
      <Modal open={open} onClose={closeModal} center>
        <ChannelForm closeModal={closeModal} />
      </Modal>
      <input type="button" className="btn btn-primary btn-block" onClick={openModal} value="Add New Channel" />
    </div>
  )
}

export default AddChannelModal;
