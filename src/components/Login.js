import React from 'react'
import {Form, Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: 'test@gmail.com',
            password: '12345',
            isLoggedIn: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.clearForm = this.clearForm.bind(this)
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
    clearForm() {
        this.setState({
            email: '',
            password: ''
        })
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h3 className="text-center pd-1">Login to the World Clock</h3>
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
                        <div>
                            <Button onClick={this.handleOnSubmit} variant="primary" type="submit">
                                Submit
                            </Button>
                            <Button onClick={this.clearForm} className="float-right" variant="light">
                            Reset
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }

    validateEmail(email) {
        return true
    }

    validatePassword(password) {
        return true
    }

    async handleOnSubmit(e) {
        e.preventDefault();
        if (!this.validateEmail(this.state.email)) return
        if (!this.validatePassword(this.state.password)) return
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