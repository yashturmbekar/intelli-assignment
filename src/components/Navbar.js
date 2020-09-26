import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'

class NavbarComponent extends React.Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }
    logout() {
        this.props.logout()
        this.props.history.replace('/login')
    }
    render() {
        return (
            <Navbar sticky="top" bg="light" expand="lg">
                <Link to="/" className="navbar-brand">World Clock</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {
                            this.props.isLoggedIn &&
                            <Link className="nav-link" onClick={this.logout}>Logout</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(NavbarComponent)