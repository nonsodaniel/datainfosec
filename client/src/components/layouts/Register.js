import React, { Component } from 'react'
import './assets/css/style.css'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';


export default class Signup extends Component {
    state = {
        fullname: "",
        email: "",
        dob: "",
        state: "",
        image: "",
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
        let { fullname, email, dob, state, image } = this.state

        let obj = { fullname, email, dob, state, image };
        console.log("obj", fullname, email, dob, state, image);
        if (fullname === "" || email === "" || dob === "" || state === "" || image === "") {
            return swal("Response", "One or more feild missen, please check and retry", "error");
        }
        this.setState({ isLoading: true })
        fetch(`${base_url}/admin/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(res => {
            return res.json()
        })
            .then((response) => {
                // console.log("Create response", response)
                if (response.statuscode === 200) {
                    localStorage.setItem("staff", JSON.stringify(response.data))
                    swal("Response", "Successfully Created a Staff", "success");
                    setTimeout(this.props.history.push('/staff'), 2000)
                    this.setState({ isLoading: false })
                } else {
                    this.setState({ isLoading: false })
                    return swal("Response", "An error occured! Please recheck and try again", "failed")

                }

            })
    }
    previewFile = () => {
        var preview = document.getElementById("image-box");
        var file = document.querySelector("input[type=file]").files[0];
        var reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                preview.src = reader.result;
                let imgStr = reader.result;
                this.setState({ image: imgStr });
                // console.log("My file result", imgStr);
            },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    render() {

        return (
            <React.Fragment>
                <section className="login">
                    <div className="container login-container">
                        <h2 className="text-center login-text">Sign Up</h2>
                        <div className="form-div">
                            <form className="form  form-group">
                                <label className="form-div-label">Fullname: <b className="label-important text-danger">*</b></label>
                                <input type="text" className="form-control mb-2 mr-sm-2 col-md-7 shadow-none " id="fullname" placeholder="Fullname" onChange={this.handleChange} required />

                                <label className="form-div-label"> Email: <b className="label-important text-danger">*</b></label>
                                <input type="email" className="form-control mb-2 mr-sm-2 col-md-7 shadow-none " id="email" placeholder="email" onChange={this.handleChange} required />

                                <label className="form-div-label">Date of Birth <b className="label-important text-danger">*</b></label>
                                <input type="date" className="form-control mb-2 mr-sm-2 col-md-7 shadow-none " id="dob" placeholder="Date of Birth" onChange={this.handleChange} required />

                                <label className="form-div-label">State of origin <b className="label-important text-danger">*</b></label>
                                <input type="text" className="form-control mb-2 mr-sm-2 col-md-7 shadow-none " id="state" placeholder="State of origin" onChange={this.handleChange} required />

                                <label className="form-div-label">City <b className="label-important text-danger">*</b></label>
                                <input type="file" accept="image/*" className="form-control mb-2 mr-sm-2 col-md-7" id="images" placeholder="City" onChange={this.previewFile} />
                                <img src="" height="150" id="image-box" alt="" className="mb-4 border" />
                                <button className="col-md-7 btn btn-primary btn-login" onClick={this.handleSubmit}>
                                    {this.state.isLoading ? "Creating... " : "Create"}
                                </button><br />
                            </form>
                        </div>


                        <div className="d-flex justify-content-center not-a-member">
                            <div className="font-size-small">Already a Staff?</div>
                            <Link to="/login" className="btn-auth">
                                <button className="btn btn-primary">
                                    Sign In
                                </button></Link>
                        </div>
                    </div>
                </section>


            </React.Fragment>
        );
    }
}




