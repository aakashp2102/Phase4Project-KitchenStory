import React, { Component } from 'react';
import { removeUserSession, getUser, getToken } from '../Utils/Common';
import Axios from 'axios';

class ChangePassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sentOldPass: "",
            newPass: "",
            submitError: "",
            formErrors: {
                sentOldPass: "",
                newPass: ""
            }
        }
    }

    handleChangePass = (event) => {
        event.preventDefault();

        const reqObject = {
            sentOldPass: this.state.sentOldPass,
            newPass: this.state.newPass
        };


        Axios.put("http://localhost:3001/admin/changepassword/" + getUser().id, reqObject, {
            headers: {
                "x-auth-token": getToken()
            }
        })
            .then(res => {
                console.log("Changed !!!!!");
                removeUserSession();
                this.props.history.push("/login");
            })
            .catch(error => {
                // console.log(error);
                this.setState({
                    submitError: error.response.data.message
                });
            })
    }


    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case "sentOldPass":
                formErrors.sentOldPass = value.length < 8 ? "Minimum 8 characters are required" : "";
                break;
            case "newPass":
                formErrors.newPass = value.length < 8 ? "Minimum 8 characters are required" : "";
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
                <form onSubmit={this.handleChangePass}>
                    <div className="form-group">
                        <label htmlFor="sentOldPass">Old Password</label>
                        <input type="password" className={`form-control ${formErrors.sentOldPass.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange} id="sentOldPass"
                            name="sentOldPass"
                            placeholder="Old Password" />
                        {formErrors.sentOldPass.length > 0 && (<span>{formErrors.sentOldPass}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPass">New Password</label>
                        <input type="password" className={`form-control ${formErrors.newPass.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange} id="newPass"
                            name="newPass"
                            placeholder="New Password" />
                        {formErrors.newPass.length > 0 && (<span>{formErrors.newPass}</span>)}
                    </div>
                    {this.state.submitError && <><div className="alert alert-danger" role="alert">{this.state.submitError}</div><br /></>}<br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }

}


export default ChangePassword;