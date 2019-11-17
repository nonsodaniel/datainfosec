import React from 'react'
import { Link, withRouter } from 'react-router-dom'

export const SignedOutNav = () => {
    return (
        <>
            <li className="nav-item">
                <Link to="/login" className="nav-link"><button className="btn  btn-logIn border text-dark bg-white">LOG IN</button></Link>
            </li>
            <li className="nav-item">
                <Link to="/register" className="nav-link"><button className="btn text-white btn-signUp">SIGN UP</button></Link>
            </li>
        </>
    )
}
