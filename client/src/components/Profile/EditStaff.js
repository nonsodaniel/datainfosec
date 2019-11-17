import React, { Component } from 'react'
import '../layouts/assets/css/style.css'
import swal from 'sweetalert';
import { Link } from 'react-router-dom'



export default class StaffDetails extends Component {
    state = {
        staff: [], isLoading: false,
        email: "", fullname: "",
        dob: "", state: "", image: "", staff_dp: "",
        isUpdated: false
    }

    componentDidMount() {
        let isDev = /localhost/.test(window.location.origin);
        console.log("isdev", isDev)
        let base_url = isDev ? "http://localhost:4000/api" : "https://datainfosec.herokuapp.com/api"

        let id = this.props.match.params.id;
        fetch(`${base_url}/admin/${id}`).then((response) => {
            return response.json()
        }).then((staffData) => {
            console.log(this.props)
            let data = staffData.data
            let { fullname, email, dob, state, staff_dp } = data
            this.setState({ fullname, email, dob, state, staff_dp })
        })
        console.log()
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state)
    }

    handleSubmit = (e) => {
        let base_url = "http://localhost:4000/api"

        e.preventDefault()
        let id = this.props.match.params.id;
        let fullname = document.querySelector("#fullname").value;
        let email = document.querySelector("#email").value;
        let dob = document.querySelector("#dob").value;
        let state = document.querySelector("#state").value;

        let obj = { fullname, email, dob, state };
        console.log("obj", obj);

        fetch(`${base_url}/admin/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        }).then((response) => {
            console.log("Update response", response)
            if (response.status === 200) {
                swal("Response", "Successfully updated staff", "success");
                setTimeout(this.props.history.push('/staff'), 2000)

            } else {
                return swal("Response", "Update Failed", "failed")
            }

        })
    }
    render() {
        return (
            <React.Fragment>
                <section className="login">
                    <div className="container login-container">
                        <h2 className="text-center login-text">Edit Details / <Link to="/staff"><b className="text-primary">Go back to view all staff</b></Link></h2>
                        <form className="form mx-auto">
                            <img src={this.state ? this.state.staff_dp : ""} height="150" id="image-box" alt="" className="mb-4 border" />

                            <label className="form-div-label">Fullname: <b className="label-important text-danger">*</b></label>
                            <input type="text" className="form-control mb-2 mr-sm-2 col-md-7 shadow-none " value={this.state ? this.state.fullname : ""} id="fullname" placeholder="Fullname" onChange={this.handleChange} />

                            <label className="form-div-label"> Email: <b className="label-important text-danger">*</b></label>
                            <input type="email" className="form-control mb-2 mr-sm-2 col-md-7 shadow-none " value={this.state ? this.state.email : ""} id="email" placeholder="email" onChange={this.handleChange} />

                            <label className="form-div-label">Date of Birth <b className="label-important text-danger">*</b></label>
                            <input type="date" className="form-control mb-2 mr-sm-2 col-md-7 shadow-none " value={this.state ? this.state.dob : ""} id="dob" placeholder="Date of Birth" onChange={this.handleChange} />

                            <label className="form-div-label">State of origin <b className="label-important text-danger">*</b></label>
                            <input type="text" className="form-control mb-2 mr-sm-2 col-md-7 shadow-none " value={this.state ? this.state.state : ""} id="state" placeholder="State of origin" onChange={this.handleChange} />
                            <button className="col-md-7 btn btn-primary btn-login" onClick={this.handleSubmit}>Update</button><br />
                        </form>

                    </div>
                </section>


            </React.Fragment>
        );
    }
}




