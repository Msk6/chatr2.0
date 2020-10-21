import React from 'react';
import { connect } from 'react-redux';
import {logout} from "../redux/actions"
function Logout({logout}) {
    return (
        <button onClick={logout} className="btn btn-danger btn-block">logout</button>
    )
    }

const mapDispatchToProps = dispatch => {
    return ({
        logout: () => dispatch(logout()),
    })
    }
    
export default connect(null,mapDispatchToProps)(Logout);