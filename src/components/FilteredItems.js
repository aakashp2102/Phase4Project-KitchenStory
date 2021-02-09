import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class FilteredItems extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items
        }
    }

    render() {
        return (

            <div className="container">
                <div className="row">
                    {this.state.items.map((itemValue, index) => {
                        return (
                            <div key={index} className="col-sm-3 mt-3">
                                <div key={index} className="card rounded border border-success">
                                    <div key={index} className="card-body">
                                        <h3 className="card-title text-danger title">{itemValue.name}</h3>
                                        <p className="card-text">Category: {itemValue.category}</p>
                                        <p className="card-title">Price: {itemValue.price}</p>
                                        <Link to={'/itemDetail/' + itemValue._id} className="btn btn-primary btn-sm">Details</Link>
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


export default FilteredItems;