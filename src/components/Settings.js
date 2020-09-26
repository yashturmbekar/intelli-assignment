import React from 'react'
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap'


export default class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: this.props.offset
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            offset: e.target.value
        })
    }

    handleSubmit() {
        this.props.changeOffset(this.state.offset)
    }
    
    render() {
        return (
            <Form>
                <b>{this.props.country}</b> (Default: {this.props.defaultOffset}) :
                <InputGroup className="text-centre">
                    <FormControl
                    placeholder="hh"
                    value={this.state.offset}
                    onChange={this.handleChange}
                    />
                    <InputGroup.Append>
                    <Button onClick={this.handleSubmit} variant="outline-secondary">Submit</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>

        )
    }
}


