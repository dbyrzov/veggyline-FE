import React, { Component } from 'react'
import SharedContext from './context-store';
import { handleLogout } from '../services/backend';


export default class Context extends Component {
    state = {
        infoMessage: '',
        color: '',
        isLoggedIn: false,
        loading: false,
        isAdmin: true,
        username: '',
        isMobileVersion: false,
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
                    setAdmin: val => {
                        this.setState({isAdmin: val});
                    },
                    setUsername: val => {
                        this.setState({username: val});
                    },
                    handleErrors: err => {
                        if (err.response && err.response.status) {
                            let code = err.response.status;
                    
                            if (code === 401 || code === 403) {
                                this.showError("Unauthorized user! Please login first!");
                                handleLogout();
                            } else if (code === 404) {
                                this.showError("The request was not found!");
                            } else {
                                this.showError(err.message);
                            }
                        } else if (err) {
                            this.showError(err);
                        } else {
                            this.showError("Some error occured. Please try again later!");
                        }

                        
                    },
                    setMobileVersion: val => {
                        this.setState({isMobileVersion: val});
                    }
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
}