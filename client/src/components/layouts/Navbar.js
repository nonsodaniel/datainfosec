import React, { Component } from 'react'
import './assets/css/style.css'
import { Link, withRouter } from 'react-router-dom'


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
    console.log("love", this.state.data)
    return (
      <React.Fragment>

        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <Link to="/" className="navbar-brand">
              <div className="logo">

              </div>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="list-container">

                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/staff" className="nav-link">Staff</Link>
                  </li>
                  {
                    !this.state.data ? (
                      (
                        <React.Fragment>
                          <li className="nav-item">
                            <Link to="/login" className="nav-link"><button className="btn  btn-logIn border text-dark bg-white">LOG IN</button></Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/register" className="nav-link"><button className="btn text-white btn-signUp">SIGN UP</button></Link>
                          </li>
                        </React.Fragment>
                      )
                    ) : (
                        null
                      )
                  }

                  {
                    this.state.data ? (
                      (
                        <React.Fragment>
                          <li className="nav-item" onClick={this.handleLogout}>
                            <Link to="#" className="nav-link"><button className="btn text-white btn-signOut">SIGN OUT</button></Link>
                          </li>
                        </React.Fragment>
                      )
                    ) : (
                        null
                      )
                  }



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



