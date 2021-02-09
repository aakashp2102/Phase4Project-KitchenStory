import React, { Component } from 'react';
import { removeUserSession, setUserSession, getUser } from '../Utils/Common';
import Axios from 'axios';



const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            submitError: null,
            loading: false,
            formErrors: {
                email: "",
                password: ""
            }
        }
    }


    handleLogin = (event) => {
        event.preventDefault();
        this.setState({
            submitError: null,
            loading: true
        });

        const reqObject = {
            email: this.state.email,
            password: this.state.password
        }


        Axios.post("http://localhost:3001/auth/admin/login", reqObject)
            .then(res => {
                this.setState({
                    loading: false
                });

                setUserSession(res.data.token, res.data.admin);
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
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
            case "email":
                formErrors.email = emailRegex.test(value) && value.length >= 5 ? "" : "Invalid Email Address !";
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

                {!getUser() ?
                    <form onSubmit={this.handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className={`form-control ${formErrors.email.length > 0 ? "is-invalid" : null}`}
                                onChange={this.handleChange} id="email"
                                name="email" placeholder="Enter email" />
                            {formErrors.email.length > 0 && (<span>{formErrors.email}</span>)}
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
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form> : ""}
            </div>
        )
    }

}


export default Login;