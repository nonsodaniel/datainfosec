import React, { Component } from 'react'
import swal from 'sweetalert';
import Moment from "react-moment";
import { Link } from 'react-router-dom'
import '../Profile/assets/Profile.css'


const $ = require('jquery');
$.DataTable = require("datatables.net")


export default class Staff extends Component {
    state = {
        data: [], category: []
    }
    componentDidMount() {
        // console.log("yepa", this.props)
        // this.fetchCategory()
        this.fetchAdmins()
    }

    fetchAdmins = async () => {

        let base_url = "http://localhost:4000/api"
        await fetch(`${base_url}/admin/`).then((response) => {
            return response.json()
        }).then((adminData) => {
            // console.log("tomiwa", adminData.data)
            this.setState({ admin: adminData.data.length ? adminData.data : null });
            $("#example").DataTable()
            let searchBox = document.querySelector("#example_filter");
            let inputs = document.querySelector("input")
            searchBox.style.float = "right";
            inputs.classList.add("form-control")
        })
    }
    handleEdit = (e) => {
        this.setState({ isEdit: true })
        this.props.history.push(`/edit-staff/${e.target.id}`)
    }
    handleView = (e) => {
        this.setState({ isEdit: true })
        this.props.history.push(`/view-staff/${e.target.id}`)
    }

    render() {
        const adminData = this.state.admin;
        // let { adminData } = this.state
        return (
            <div className="">

                <div className="main-content-container container-fluid px-4" style={{ background: "white" }}>
                    <div className="card-body" style={{ background: "white" }}>
                        <Link to="/register"><button className="btn btn-primary add-staff-btn">Add Staff</button></Link>
                        <table id="example" className="table table-striped table-bordered table-hover" width="100%" >
                            <thead>
                                <tr>
                                    <th>S/n</th>
                                    <th> Photo</th>
                                    <th> Name</th>
                                    <th>Email</th>
                                    <th>Birth Date</th>
                                    <th>State of Origin</th>
                                    <th>Date Created</th>
                                    <th>View</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    adminData ? (
                                        adminData.map((o, i) => {
                                            console.log("my data", o, i, o.fullname);
                                            return (
                                                <tr key={o._id}>
                                                    <td>{i + 1}</td>
                                                    <td> <img className="staff-photo" src={o.staff_dp} alt=".." /> </td>
                                                    <td>{o.fullname}</td>
                                                    <td>{o.email}</td>
                                                    <td> <Moment fromNow>{o.dob}</Moment> </td>
                                                    <td>{o.state}</td>
                                                    <td><Moment fromNow>{o.createdAt}</Moment></td>
                                                    <td><button className="btn btn-info btn-xs action-btn" onClick={this.handleView} id={o._id}><i className="material-icons" id={o._id} style={{ left: "-6px", fontSize: "13px" }}>local_see</i></button></td>
                                                    <td><button className="btn btn-primary btn-xs action-btn" onClick={this.handleEdit} id={o._id}><i className="material-icons" id={o._id} style={{ left: "-6px", fontSize: "13px" }}>mode_edit</i></button></td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                            <div>No data to show</div>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}


