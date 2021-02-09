import React, { Component } from 'react';
import { getUser, getToken } from '../Utils/Common';
import Axios from 'axios';

class FoodItemAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            category: "Coffee",
            brand: "",
            description: "",
            price: 0,
            containerType: "Pouch",
            submitError: null,
            formErrors: {
                name: "",
                description: "",
                category: "",
                brand: "",
                price: "",
                containerType: ""
            }
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();

        const reqObject = {
            name: this.state.name,
            category: this.state.category,
            brand: this.state.brand,
            description: this.state.description,
            price: this.state.price,
            containerType: this.state.containerType
        }


        Axios.post("http://localhost:3001/foodItem", reqObject, {
            headers: {
                "x-auth-token": getToken()
            }
        })
            .then(res => {
                this.props.history.push("/items")
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
            case "brand":
                formErrors.brand = value.length < 2 ? "Minimum 2 characters are required" : "";
                break;
            case "description":
                formErrors.description = value.length < 20 ? "Minimum 20 characters are required" : "";
                break;
            case "price":
                formErrors.price = value.length < 0 ? "Price cannot be negative !" : "";
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
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name"
                            className={`form-control ${formErrors.name.length > 0 ? "is-invalid" : null}`} id="name"
                            onChange={this.handleChange} />
                        {formErrors.name.length > 0 && (<span>{formErrors.name}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select name="category" className="form-control" onChange={this.handleChange} id="category">
                            <option>Coffee</option>
                            <option>Dals and Pulses</option>
                            <option>Ghee and Oils</option>
                            <option>Atta and flours</option>
                            <option>Masala and spices</option>
                            <option>Nuts</option>
                            <option>Sugar and salt</option>
                            <option>Snacks</option>
                            <option>Tea</option>
                            <option>Soft Drinks</option>
                            <option>Juices</option>
                            <option>Noddles and Pasta</option>
                            <option>Chocolates, Sweets and Jams</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <input type="text" name="brand" id="brand"
                            className={`form-control ${formErrors.brand.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange} />
                        {formErrors.brand.length > 0 && (<span>{formErrors.brand}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description"
                            className={`form-control ${formErrors.description.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange} rows="3"></textarea>
                        {formErrors.description.length > 0 && (<span>{formErrors.description}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price"
                            className={`form-control ${formErrors.price.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange} />
                        {formErrors.price.length > 0 && (<span>{formErrors.price}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="containerType">Container Type</label>
                        <select name="containerType" className="form-control" onChange={this.handleChange} id="containerType">
                            <option>Pouch</option>
                            <option>Bottle</option>
                            <option>Can</option>
                            <option>Cartoon</option>
                        </select>
                    </div>
                    {this.state.submitError && <><div className="alert alert-danger" role="alert">{this.state.submitError}</div><br /></>}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }

}

export default FoodItemAdd;