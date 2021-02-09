import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import PrivateRoute from '../Utils/PrivateRoute';
import { getToken, removeUserSession } from '../Utils/Common';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import ChangePassword from './ChangePassword';
import FoodItemAdd from './FoodItemAdd';
import BrowseAllItems from './BrowseAllItems';
import ItemDetail from './ItemDetail';
import FoodItemEdit from './FoodItemEdit';
import Cart from './Cart';
import PaymentSuccess from './PaymentSucess';


class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        }
    }


    handleLogout = (event) => {
        event.preventDefault();
        removeUserSession();
        this.setState({ loggedIn: false });
    }


    handleLogin = (event) => {
        this.setState({ loggedIn: true });
    }

    render() {
        return (
            <div className="container" style={{ marginTop: 20 }}>
                <Router>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <Link to={'/'} className="navbar-brand">KitchenStory.com</Link>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to={'/items'} className="nav-link" style={{ color: "white" }}>Browse Food Items</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/itemAdd'} className="nav-link" style={{ color: "white" }}>Add Food Item</Link>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item .ml-auto">
                                        <Link to={'/changePass'} className="nav-link" style={{ color: "white" }}>Change Password</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/signUp'} onClick={this.handleLogin} className="nav-link" style={{ color: "white" }}>Sign Up</Link>
                                    </li>
                                    {getToken() != null ? "" : <li className="nav-item .ml-auto">
                                        <Link to={'/login'} onClick={this.handleLogin} className="nav-link" style={{ color: "white" }}>Login</Link>
                                    </li>}
                                    {getToken() != null ? <li className="nav-item .ml-auto">
                                        <button onClick={this.handleLogout} className="btn btn-danger" style={{ color: "white" }}>Logout</button>
                                    </li> : ""}
                                </ul>
                            </div>
                        </nav> <br />
                    </div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signUp" component={SignUp} />
                        <Route exact path="/logout" change={true} component={Login} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/items" component={BrowseAllItems} />
                        <Route exact path="/itemDetail/:id" component={ItemDetail} />
                        <Route exact path="/payment" component={PaymentSuccess} />
                        <Route exact path="/cart/:name/:cat/:qty/:price" component={Cart} />
                        <PrivateRoute exact path="/itemAdd" component={FoodItemAdd} />
                        <PrivateRoute exact path="/itemEdit/:id" component={FoodItemEdit} />
                        <PrivateRoute exact path="/changePass" component={ChangePassword} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Main;