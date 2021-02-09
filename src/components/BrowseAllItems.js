import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getToken, getUser } from '../Utils/Common';
import Axios from 'axios';

class BrowseAllItems extends Component {


    constructor(props) {
        super(props);

        this.state = {
            items: [],
            responseError: ""
        }
    }

    getFoodItems = () => {
        Axios.get("http://localhost:3001/foodItems")
            .then((res) => {
                const eventsList = res.data;
                this.setState({ items: eventsList });
            })
            .catch(err => {
                console.log("There is some error : ", err);
            })
    }


    deleteNote(id) {
        Axios.delete('http://localhost:3001/foodItem/' + id, {
            headers: {
                "x-auth-token": getToken()
            }
        })
            .then((result) => {
                alert("Item deleted successfully !");
                this.getFoodItems();
            })
            .catch(err => console.log("There is some error : " + err));
    }



    componentDidMount = () => {
        this.getFoodItems();
    }


    render() {
        return (
            <div className="container">
                <h3>{this.state.items.length > 0 ? "Here You Go !!" : "OOPS, Sorry no items found."}</h3>
                <br />
                {getUser() !== null ? <Link to="/itemAdd" className="btn btn-info" >Add New Item</Link> : <Link to="/itemAdd" className="btn btn-secondary disabled">Login to add new item</Link>}
                <br /><br />
                <div className="row">
                    {this.state.items.map((eventValue, index) => {
                        return (
                            <div key={index} className="col-sm-3 mt-3">
                                <div key={index} className="card rounded border border-success">
                                    <div key={index} className="card-body">
                                        <h3 className="card-title text-danger title">{eventValue.name}</h3>
                                        <p className="card-text">Category: {eventValue.category}</p>
                                        <p className="card-title">Brand: {eventValue.brand}</p>
                                        <p className="card-title">Price: {eventValue.price}</p>
                                        <Link to={'/itemDetail/' + eventValue._id} className="btn btn-primary btn-sm">View and Buy</Link>
                                        {getToken() !== null ? <button onClick={this.deleteNote.bind(this, eventValue._id)} style={{ margin: 2 }} className="btn btn-danger btn-sm">Delete</button> : ""}
                                        {getToken() !== null ? <Link to={'/itemEdit/' + eventValue._id} style={{ margin: 2 }} className="btn btn-info btn-sm">Edit</Link> : ""}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div >
        )
    }

}

export default BrowseAllItems;