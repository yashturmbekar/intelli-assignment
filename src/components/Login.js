import React from 'react'
import {Form, Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '123@gmail.com',
            password: '1234',
            isLoggedIn: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h3 className="text-center">Login to the World Clock</h3>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={this.state.email} onChange={this.handleEmailChange} type="email" placeholder="Enter email" />
                            <Form.Control.Feedback type="invalid">Please enter valid e-mail id</Form.Control.Feedback>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control.Feedback type="invalid">Please enter password</Form.Control.Feedback>
                            <Form.Control required value={this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button onClick={this.handleOnSubmit} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }

    async handleOnSubmit(e) {
        e.preventDefault();
        const state = {
            isLoggedIn: true,
            email: this.state.email,
            password: this.state.password
        }
        await this.props.login(state)
        this.props.history.replace('/', state)
    }
}

export default withRouter(Login)