import React from 'react';
import { connect } from 'react-redux';
import {logout, stopTimer, stopChannelTimer} from "../redux/actions"
import {Link} from "react-router-dom"

function Logout({logout, stopTimer, stopChannelTimer}) {
    const handleClick = () => {
        stopTimer()
        stopChannelTimer()
        logout()
    }
    return (
        <Link to="/login">
            <button onClick={handleClick} className="btn btn-danger btn-block">logout</button>
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