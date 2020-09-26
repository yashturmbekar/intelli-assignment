import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";

import './App.css'

import NavbarComponent from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {}
        this.logout = this.logout.bind(this)
        this.login = this.login.bind(this)
    }

    logout() {
        this.setState({
            isLoggedIn: false
        })
    }

    async login(state) {
        await this.setState(state)
    }
    
    render() {
        return (
            <BrowserRouter>
                <NavbarComponent isLoggedIn={this.state.isLoggedIn} logout={this.logout}/>
                    <section className="container">
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={() => <Login login={this.login} />} />
                    </section>
            </BrowserRouter>
        )
    }
}