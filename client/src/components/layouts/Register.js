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
        let base_url = "http://localhost:4000/api"

        e.preventDefault()
        let { fullname, email, dob, state, images, id } = this.state

        let obj = { fullname, email, dob, state, images };
        console.log("obj", obj, this.state);

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
                console.log("Update response", response)
                if (response.statuscode === 200) {
                    localStorage.setItem("staff", JSON.stringify(response.data))
                    swal("Response", "Successfully Created a Staff", "success");
                    setTimeout(this.props.history.push('/staff'), 2000)

                } else {
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
                console.log("My file result", imgStr);
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
                        <form className="form mx-auto">
                            <input type="text" className="form-control mb-2 mr-sm-2 col-md-7 shadow-none " id="fullname" placeholder="Fullname" onChange={this.handleChange} /><br />
                            <input type="email" className="form-control mb-2 mr-sm-2 col-md-7 shadow-none " id="email" placeholder="email" onChange={this.handleChange} /><br />
                            <input type="date" className="form-control mb-2 mr-sm-2 col-md-7 shadow-none " id="dob" placeholder="Date of Birth" onChange={this.handleChange} /><br />
                            <input type="text" className="form-control mb-2 mr-sm-2 col-md-7 shadow-none " id="state" placeholder="State of origin" onChange={this.handleChange} /><br />
                            <input type="file" accept="image/*" className="form-control mb-2 mr-sm-2 col-md-7" id="images" placeholder="City" onChange={this.previewFile} />
                            <img src="" height="200" id="image-box" alt="" className="mb-4" />
                            <button className="col-md-7 btn btn-primary btn-login" onClick={this.handleSubmit}>Create</button><br />
                        </form>

                        <div className="d-flex justify-content-center not-a-member">
                            <div className="font-size-small">Not a member yet?</div>
                            <div>Sign Up</div>
                        </div>
                    </div>
                </section>


            </React.Fragment>
        );
    }
}




