import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getToken, getUser } from '../Utils/Common';
import Axios from 'axios';

class Cart extends Component {


    constructor(props) {
        super(props);

        this.state = {
            items: [],
            sum: 0
        }
    }


    update = () => {
        const name = this.props.match.params.name;
        const category = this.props.match.params.cat;
        const qty = this.props.match.params.qty;
        const price = this.props.match.params.price;

        const object = {
            name: name,
            category: category,
            qty: qty,
            price: price
        }

        this.setState({
            items: [...this.state.items, object]
        })
    }


    render() {
        return (
            <div className="container" style={{ textAlign: "center" }}>
                <div className="container" style={{ margin: "10px" }}>
                    <Link to={"/payment"} className="btn btn-success btn-lg">Make Payment</Link>
                </div>
                <div className="container">
                    <button onClick={this.update} className="btn btn-primary btn-sm">See Cart Items</button>
                </div>

                <div className="row">
                    {this.state.items.map((eventValue, index) => {

                        return (
                            <div key={index} className="col-sm-3 mt-3">
                                <div key={index} className="card rounded border border-success">
                                    <div key={index} className="card-body">
                                        <h3 className="card-title text-danger title">{eventValue.name}</h3>
                                        <p className="card-text">Category: {eventValue.category}</p>
                                        <p className="card-title">Quantity: {eventValue.qty}</p>
                                        <p className="card-title">Price: {eventValue.price}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

}

export default Cart;