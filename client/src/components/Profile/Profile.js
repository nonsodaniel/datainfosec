import React, { Component } from 'react'
import './assets/Profile.css'

export default class Profile extends Component {
    state = {
        data: {}
    }
    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("staff"))
        // console.log("real data", data)
        this.setState({ data })
        // console.log("Profile state", this.props)
        if (!data) {
            this.props.history.push('/login')
        }
    }
    render() {
        return (
            <>
                <div className="container profile-container">
                    <div className="row">
                        <div className="col-md-4 left-div">
                            <div className="img-div mx-auto">
                                <img className="mx-auto profile-image" src={this.state.data && this.state.data.staff_dp} alt="..." />
                            </div>
                            <h5 className="text-center">{this.state.data ? this.state.data.fullname : ""}</h5>
                            <h6 className="text-center">{this.state.data ? this.state.data.email : ""}</h6> <br />
                        </div>
                        <div className="col-md-8 right-div">
                            <div className="top-right-div d-flex mx-auto">
                                <ul>
                                    <li className="list-title">Email:</li>
                                    <li className="list-title">Birth Date:</li>
                                    <li className="list-title">State of origin:</li>
                                </ul>
                                <ul className="ul-desc">
                                    <li className="list-desc">{this.state.data && this.state.data.email}</li>
                                    <li className="list-desc">{this.state.data && this.state.data.dob}</li>
                                    <li className="list-desc">{this.state.data && this.state.data.state}</li>
                                </ul>
                            </div>
                            <div className="bottom-right-div mx-auto">
                                <h2 className="text-center profile-title-right"> A little about me   <span className="">😊</span> </h2>
                                <p className="profile-description">
                                    I am a dummy data! therefore, do not take whatever you see here as correct<br />
                                    This is just a basic demo I could come up with <br />
                                    Browse through and Enjoy! <span className="text-danger">❤</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
