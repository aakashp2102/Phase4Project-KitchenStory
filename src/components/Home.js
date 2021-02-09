import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { getUser } from '../Utils/Common';
import FilteredItems from './FilteredItems';



class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: "Coffee",
            maxPrice: 0,
            containerType: "Pouch",
            submitError: "",
            items: []
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            items: []
        });

        const reqObject = {
            category: this.state.category,
            maxPrice: this.state.maxPrice,
            containerType: this.state.containerType
        }

        console.log(reqObject);

        if (this.state.price < 0) {
            this.setState({
                submitError: "Enter a valid price !"
            });
        }
        else {
            Axios.post("http://localhost:3001/foodItems/filter", reqObject, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.data.length > 0) {
                        this.setState({ items: res.data, submitError: "" });
                    } else {
                        this.setState({
                            submitError: "No items Found !"
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        submitError: error.response.data.message
                    });
                })
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => { console.log(this.state) });
    }

    render() {
        return (
            <div className="container">
                <h1 className="title" style={{ color: "purple", marginTop: "0.5%", fontSize: 30 }}>Welcome {getUser() !== null ? getUser().name : ""} to KitchenStory.com </h1><br />
                <p className="title" style={{ color: "brown" }}><span style={{ fontWeight: "bold" }}>Buying food items made smooth. </span>Use the app to burn your hunger !!</p>
                <p className="title" style={{ color: "brown" }}><span style={{ fontWeight: "bold" }}> Buy what you want. </span>
                Browse through all the
                items by going through the navigation bar link. </p>


                <div className="container">
                    <div className="container" style={{ width: "60%" }}>
                        <form onSubmit={this.handleSubmit}>
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
                                <label htmlFor="maxPrice">Max Price</label>
                                <input type="number" name="maxPrice"
                                    className="form-control"
                                    id="maxPrice" onChange={this.handleChange} />
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
                            <button type="submit" className="btn btn-primary">Search</button>
                        </form>
                    </div>
                    <div className="container" style={{ marginBottom: "50px" }}>
                        {
                            this.state.items.length > 0 ?
                                <div className="container" style={{ marginTop: 20 }}>
                                    <div className="alert alert-success" role="alert">Bravo !! Found some items.</div>
                                    <FilteredItems items={this.state.items} />
                                </div> : ""
                        }</div>
                </div>

            </div>
        )
    }

}

export default Home;