import React, { Component } from 'react'
import './assets/Profile.css'

export default class Profile extends Component {
    state = {
        data: {}
    }
    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("staff"))
        console.log("real data", data)
        this.setState({ data })
    }
    render() {
        // console.log("Wunmi", this.state.data.fullname)
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 left-div">
                            <div className="img-div mx-auto">

                            </div>
                            <h5 className="text-center">{this.state.data ? this.state.data.fullname : ""}</h5>
                            <h6 className="text-center">{this.state.data ? this.state.data.email : ""}</h6> <br />
                        </div>
                        <div className="col-md-8 right-div">
                            <div className="top-right-div d-flex mx-auto">
                                <ul>
                                    <li className="list-title">Email:</li>
                                    <li className="list-title">Birth Date:</li>
                                    <li className="list-title">State of origin</li>
                                </ul>
                                <ul>
                                    <li className="list-desc">{this.state.data && this.state.data.email}</li>
                                    <li className="list-desc">{this.state.data && this.state.data.dob}</li>
                                    <li className="list-desc">{this.state.data && this.state.data.state}</li>
                                </ul>
                            </div>
                            <div className="bottom-right-div mx-auto">
                                <h2 className="text-center"> A little about me</h2>
                                <p className="">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis modi ipsa quis! Cum hic quam quibusdam, tempore perspiciatis dolores, debitis aliquid placeat eius, facilis ullam laborum iste cumque aut mollitia!

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
