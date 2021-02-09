import React, { Component } from 'react';
import { getUser } from '../Utils/Common';
import Axios from 'axios';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            phone: 0,
            username: "",
            password: "",
            submitError: "",
            formErrors: {
                name: "",
                email: "",
                phone: "",
                username: "",
                password: "",
            }
        }
    }


    handleSignUp = (event) => {
        event.preventDefault();
        this.setState({
            submitError: null
        });

        const reqObject = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            username: this.state.username,
            password: this.state.password
        }


        Axios.post("http://localhost:3001/admin/signup", reqObject)
            .then(res => {
                alert("Signup Successful !")
                this.props.history.push("/login");
            })
            .catch(error => {
                if (error.response.status === 400 || error.response.status === 500) {
                    this.setState({
                        submitError: error.response.data.message
                    });
                }
                else {
                    this.setState({
                        submitError: "Something went wrong. Please try again later."
                    });
                }
            })

    }


    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case "name":
                formErrors.name = value.length < 3 ? "Minimum 3 characters are required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value) && value.length >= 5 ? "" : "Invalid Email Address !";
                break;
            case "phone":
                formErrors.phone = value.length < 10 ? "Minimum 10 digits are required" : "";
                break;
            case "username":
                formErrors.username = value.length < 5 ? "Minimum 5 characters are required" : "";
                break;
            case "password":
                formErrors.password = value.length < 8 ? "Minimum 8 characters are required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => { console.log(this.state) });
    }



    render() {

        const { formErrors } = this.state;

        return (
            <div className="container" style={{ width: "60%" }}>
                {getUser() ? <div className="alert alert-success" role="alert">You are already signed up !</div> : <form onSubmit={this.handleSignUp}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className={`form-control ${formErrors.name.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange} id="name"
                            name="name" placeholder="Enter name" />
                        {formErrors.name.length > 0 && (<span>{formErrors.name}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className={`form-control ${formErrors.email.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange} id="email"
                            name="email" placeholder="Enter email" />
                        {formErrors.email.length > 0 && (<span>{formErrors.email}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="number" className={`form-control ${formErrors.phone.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange} id="phone"
                            name="phone" placeholder="Enter phone" />
                        {formErrors.phone.length > 0 && (<span>{formErrors.phone}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className={`form-control ${formErrors.username.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange} id="username"
                            name="username" placeholder="Enter username" />
                        {formErrors.username.length > 0 && (<span>{formErrors.username}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className={`form-control ${formErrors.password.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange} id="password"
                            name="password"
                            placeholder="Password" />
                        {formErrors.password.length > 0 && (<span>{formErrors.password}</span>)}
                    </div>
                    {this.state.submitError && <><div className="alert alert-danger" role="alert">{this.state.submitError}</div><br /></>}<br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>}
            </div>
        )
    }

}


export default SignUp; 