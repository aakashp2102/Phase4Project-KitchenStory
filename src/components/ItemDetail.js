import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../Utils/Common';


class ItemDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: {},
            qty: 0
        }

    }

    componentDidMount = () => {

        Axios.get('http://localhost:3001/fooditem/' + this.props.match.params.id)
            .then(res => {
                this.setState({ item: res.data });
            })
            .catch(err => console.log("There is some error : " + err));
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        this.setState({ [name]: value }, () => { console.log(this.state) });
    }


    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Details of <span className="text-success">{this.state.item.name}</span>
                        </h3>
                        <br />
                    </div>

                    <div className="container">
                        <div className="panel-body">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{this.state.item.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                        <td>{this.state.item.category}</td>
                                    </tr>
                                    <tr>
                                        <th>Brand</th>
                                        <td>{this.state.item.brand}</td>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <td>{this.state.item.description}</td>
                                    </tr>
                                    <tr>
                                        <th>Container Type</th>
                                        <td>{this.state.item.containerType}</td>
                                    </tr>
                                    <tr>
                                        <th>Price</th>
                                        <td>{this.state.item.price}</td>
                                    </tr>
                                    <tr>
                                        <div class="col-xs-2">
                                            <th><label for="ex1">Quantity</label></th>
                                            <input class="form-control" name="qty" onChange={this.handleChange} id="ex1" type="text" />
                                        </div>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Link to="/items" className="btn btn-info">Back to Browsing Events</Link>
                                        </td>
                                        <td>
                                            <Link to={"/cart/" + this.state.item.name + "/" + this.state.item.category + "/" + this.state.qty + "/" + (this.state.qty * this.state.item.price)} className="btn btn-info">Add and view cart</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div >

        )
    }


}


export default ItemDetail;