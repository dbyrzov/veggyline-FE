import React, { Component } from 'react'
import SharedContext from './context-store';
import { handleLogout } from '../services/backend';
import { navigate } from '@reach/router';
import ProductModel from '../models/Product';


export default class Context extends Component {
    state = {
        infoMessage: '',
        color: '',
        isLoggedIn: false,
        loading: false,
        isAdmin: false,
        username: '',
        isMobileVersion: false,
        basketCount: 0,
        orderProducts: new Array(),
        orderTotal: 0,
    };

    render() {
        return (
            <SharedContext.Provider
                value={{
                    infoMessage: this.state.infoMessage,
                    color: this.state.color,
                    isLoggedIn: this.state.isLoggedIn,
                    loading: this.state.loading,
                    isAdmin: this.state.isAdmin,
                    username: this.state.username,
                    isMobileVersion: this.state.isMobileVersion,
                    basketCount: this.state.basketCount,
                    orderProducts: this.state.orderProducts,
                    orderTotal: this.state.orderTotal,
                    showInfo: msg => {
                        this.setState({color: 'rgba(80, 201, 43, 0.74)'});
                        this.setState({infoMessage: msg});
                        this.setState({loading: false});
                        setTimeout(() => { this.setState({infoMessage: ""}); }, 5000);
                    },
                    showError2: msg => {
                        this.setState({color: 'rgba(196, 32, 32, 0.74)'});
                        this.setState({infoMessage: msg});
                        this.setState({loading: false});
                        setTimeout(()=> { this.setState({infoMessage: ""}); }, 5000);
                    },
                    setLoggedIn: val => {
                        this.setState({isLoggedIn: val});
                    },
                    setLoading: val => {
                        this.setState({loading: val});
                    },
                    setIsAdmin: val => {
                        this.setState({isAdmin: val});
                    },
                    setUsername: val => {
                        this.setState({username: val});
                    },
                    handleErrors: err => {
                        if (err.response && err.response.status) {
                            let code = err.response.status;
                            console.log('CODES');
                            console.log(code);
                            if (code === 401 || code === 403) {
                                this.showError("Unauthorized user! Please login first!");
                                handleLogout();
                                this.setState({isLoggedIn: false});
                                this.setState({isAdmin: false});
                                this.setState({username: ''});
                            } else if (code === 404) {
                                this.showError("The request was not found!");
                            } else if (code === 503) {
                                navigate(`/unavailable`);
                            } else {
                                this.showError(err.message);
                            }
                        } else if (err && JSON.stringify(err).length > 0) {
                            this.showError(err);
                        } else {
                            this.showError("Some error occured. Please try again later!");
                        }

                        
                    },
                    setMobileVersion: val => {
                        this.setState({isMobileVersion: val});
                    },
                    setBasketCount: val => {
                        this.setState({basketCount: val});
                    },
                    setOrderProducts: val => {
                        this.setState({orderProducts: val});
                    },
                    setOrderTotal: val => {
                        this.setState({orderTotal: val});
                    },
                    addProductToBasket: product => {
                        let isThere = false;
                        let tmpOrder = this.state.orderProducts;
                        // if (this.state.orderProducts) tmpOrder = this.state.orderProducts;
                        // else tmpOrder = [];
                        let tmpTotal = 0;
                    
                        tmpOrder.forEach(el => {
                          if (el.product_id == product.product_id) {
                            el.quantity = product.quantity;
                            isThere = true;
                          }
                          tmpTotal += el.price*el.quantity;
                        });
                        if(!isThere) {
                          product.quantity = product.quantity;
                          tmpOrder.push(product);
                          tmpTotal += product.price*product.quantity;
                        }
                        tmpTotal = tmpTotal.toFixed(2);
                        this.setState({orderProducts: tmpOrder});
                        this.setState({orderTotal: tmpTotal});
                        this.setState({basketCount: tmpOrder.length});
                    },
                    delProductFromBasket: product => {
                        let tmpTotal = 0;
                        let tmpOrder = this.state.orderProducts;
                        let arr = tmpOrder.filter(p => {return p.product_id != product.product_id;});
                        this.setState({orderProducts: arr});
                        arr.forEach(p => {
                            tmpTotal += (p.price*p.quantity);
                        });
                        tmpTotal = tmpTotal.toFixed(2);
                        this.setState({orderTotal: tmpTotal});
                        this.setState({basketCount: this.state.basketCount - 1});
                    },
                }}
            >
                {this.props.children}
            </SharedContext.Provider>
        );
    }

    showError(msg) {
        this.setState({color: 'rgba(196, 32, 32, 0.74)'});
        this.setState({infoMessage: msg});
        this.setState({loading: false});
        setTimeout(()=> { this.setState({infoMessage: ""}); }, 5000);        
    }

    calculateTotal() {

    }
}