import React from 'react';
import { connect } from 'react-redux';
import {logout, stopTimer} from "../redux/actions"
import {Link} from "react-router-dom"

function Logout({logout, stopTimer}) {
    const handleClick = () => {
        stopTimer()
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
    })
    }
    
export default connect(null,mapDispatchToProps)(Logout);