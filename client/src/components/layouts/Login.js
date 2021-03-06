import React, { Component } from 'react'
import './assets/css/style.css'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';


export default class Login extends Component {
    state = {
        email: "",
        isLoading: false
    };
    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state);
    };
    handleSubmit = (e) => {
        let isDev = /localhost/.test(window.location.origin);
        console.log("isdev", isDev)
        let base_url = isDev ? "http://localhost:4000/api" : "https://datainfosec.herokuapp.com/api"

        e.preventDefault()
        let { email } = this.state
        if (email === "") {
            return swal("Response", "Please enter your email", "error");
        }
        this.setState({ isLoading: true })
        let obj = { email };
        console.log("obj", obj, this.state);

        fetch(`${base_url}/admin/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(res => {
            return res.json()
        })
            .then((response) => {
                console.log("login response", response)
                if (response.statuscode === 200) {
                    localStorage.setItem("staff", JSON.stringify(response.data))
                    swal("Response", "Login Successful", "success");
                    setTimeout(this.props.history.push('/'), 2000)
                } else if (response.statuscode === 404) {
                    this.setState({ isLoading: false })
                    return swal("Response", `The Email does not exist! Please recheck and try again`, "failed")
                } else {
                    this.setState({ isLoading: false })
                    return swal("Response", "An error occured! Please recheck and try again", "failed")
                }

            })
    }
    render() {
        return (
            <React.Fragment>
                <section className="login">
                    <div className="container login-container">
                        <h2 className="text-center login-text">Log In</h2>
                        <form className="form mx-auto">
                            <input type="email" className="form-control mb-2 mr-sm-2 col-md-7 shadow-none " id="email" placeholder="Email" onChange={this.handleChange} required /><br />
                            <button className="col-md-7 btn btn-primary btn-login" onClick={this.handleSubmit}>
                                {this.state.isLoading ? "Logging In... " : "Log In"}
                            </button><br />
                        </form>

                        <div className="d-flex justify-content-center not-a-member">
                            <div className="font-size-small">Not a staff yet?</div>
                            <Link to="/register" className="btn-auth"><button className="btn btn-primary">Sign Up</button></Link>
                        </div>
                    </div>
                </section>


            </React.Fragment>
        );
    }
}

