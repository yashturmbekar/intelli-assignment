import React from 'react'
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap'


export default class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentOffset: this.props.offset
        }
    }
    
    render() {
        return (
            <Form>
                {this.props.country} :
                <InputGroup className="text-centre">
                    <FormControl
                    placeholder="hh"
                    value={this.state.currentOffset}
                    onChange={(e) => {this.setState({offset: e.target.value })}}
                    />
                    <InputGroup.Append>
                    <Button onClick={this.props.changeOffset(this.state.offset)} variant="outline-secondary">Submit</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>

        )
    }
}


