import React from 'react'
import { Link } from 'react-router-dom'


export const SignedInNav = ({ logout }) => {
    return (
        <>
            <li className="nav-item">
                <Link to="/" className="nav-link">Profile</Link>
            </li>
            <li className="nav-item">
                <Link to="/staff" className="nav-link">Staff</Link>
            </li>
            <li className="nav-item" onClick={logout}>
                <Link to="#" className="nav-link"><button className="btn text-white btn-signOut">SIGN OUT</button></Link>
            </li>
        </>
    )
}
