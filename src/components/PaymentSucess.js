import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class PaymentSuccess extends Component {

    render() {
        return (
            <div className="container" style={{ textAlign: "center" }}>
                <div class="alert alert-success">
                    <strong>Payement Success !</strong>
                </div>
                <Link to="/items" className="btn btn-info">Back To Items</Link>
            </div>
        )
    }


}


export default PaymentSuccess;