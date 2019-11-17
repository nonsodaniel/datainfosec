import React, { Component } from 'react'
import './assets/css/style.css'
import { Link, withRouter } from 'react-router-dom'
import { SignedOutNav } from './navs/SignedOutNav'
import { SignedInNav } from './navs/SignedInNav'


class Navbar extends Component {
  state = {
    data: {}
  }
  componentDidMount() {
    this.fetchLoggedIn()
  }
  fetchLoggedIn = async () => {
    let data = await JSON.parse(localStorage.getItem("staff"))
    this.setState({ data })
  }

  handleLogout = (e) => {
    e.preventDefault();
    console.log(this.props)
    localStorage.removeItem("staff")
    this.props.history.push('/register')
  }
  render() {
    let localData = localStorage.getItem("staff");
    let Links = localData ? <SignedInNav logout={this.handleLogout} /> : <SignedOutNav />
    // console.log("Links", Links)
    return (
      <React.Fragment>

        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <Link to="/" className="navbar-brand">
              <div className="logo">
                The navbar place
            </div>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="list-container">

                <ul className="navbar-nav">
                  {Links}
                  {/* <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">About Us</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Shopper</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Contact Us</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link"><button className="btn  btn-logIn border text-dark bg-white">LOG IN</button></Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link"><button className="btn text-white btn-signUp">SIGN UP</button></Link>
                  </li> */}

                </ul>

              </div>
            </div>
          </nav>
        </header>

      </React.Fragment>
    );
  }
}

export default withRouter(Navbar)



