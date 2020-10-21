import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { addChannel } from "./redux/actions/index";

const ChannelForm = ({addChannel,closeModal}) => {
  const [channel, setChannel] = useState({
    name:""
  })

  const textChangeHandler = (event) => {
    setChannel({ ...channel, [event.target.name]: event.target.value });
  }

  const submitChannel = (event) => {
    event.preventDefault();
    addChannel(channel, closeModal);
  }

  return (
    <div className="mt-5 p-2">
      <form onSubmit={submitChannel}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Name</span>
          </div>
          <input type="text" className="form-control" name="name" onChange={textChangeHandler}/>
        </div>
        <input type="submit"/>
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
