import React from 'react';
import { connect } from 'react-redux';
import {logout, stopTimer, stopChannelTimer} from "../redux/actions"
import {Link} from "react-router-dom"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';



function Logout({logout, stopTimer, stopChannelTimer}) {
    const handleClick = () => {
        stopTimer()
        stopChannelTimer()
        logout()
    }
    return (
      <Link to="/login">
        <IconButton onClick={handleClick}>
          <ExitToAppIcon style={{ fontSize: 40 }}/>
        </IconButton>
      </Link>
    )
    }

const mapDispatchToProps = dispatch => {
    return ({
        logout: () => dispatch(logout()),
        stopTimer: () => dispatch(stopTimer()),
        stopChannelTimer: () => dispatch(stopChannelTimer())
    })
    }

export default connect(null,mapDispatchToProps)(Logout);
