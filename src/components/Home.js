import React from 'react'
import {withRouter} from 'react-router-dom'
import * as moment from 'moment'
import { Form, Button, InputGroup} from 'react-bootstrap'
import Time from './Time';
import Settings from './Settings';

const defaultLondonOffset = 8;
const defaultIndianOffset = 12.5

class Home extends React.Component {
    constructor() {
        super()
        this.defaultTimeout = 1;
        this.defaultTimeFormat = 'HH:mm:ss';
        this.state = {
            time: moment().utcOffset(-7).format(this.defaultTimeFormat)
        }
        this.handleTimeChange = this.handleTimeChange.bind(this)
        this.handleTimeSubmit = this.handleTimeSubmit.bind(this)
        this.updateTime = this.updateTime.bind(this)
        this.getTimeWith = this.getTimeWith.bind(this)
        this.changeOffsetForIndia = this.changeOffsetForIndia.bind(this)
        this.changeOffsetForLondon = this.changeOffsetForLondon.bind(this)
        this.setTime = this.setTime.bind(this)
        this.timeout = setInterval(this.updateTime, this.defaultTimeout * 1000)
        this.londonOffset = defaultLondonOffset;
        this.indianOffset = defaultIndianOffset;
    }

    updateTime() {
        this.setState({
            time: moment(this.state.time, this.defaultTimeFormat).add(this.defaultTimeout, 's').format(this.defaultTimeFormat)
        })
    }

    setTime(time) {
        if (moment(time, this.defaultTimeFormat).isValid()) {
            return this.setStatus({
                time
            })
        }
        console.error('Invalid time')
    }

    getTimeWith(offset = 0) {
        return moment(this.state.time, this.defaultTimeFormat).add(offset * 60, 'm').format(this.defaultTimeFormat)
    }

    componentWillUnmount() {
        clearInterval(this.timeout)
    }

    changeOffsetForLondon(offset) {
        console.log('Logging')
        if (offset > -24 && offset < 24) {
            this.londonOffset = offset
        }
    }

    changeOffsetForIndia(offset) {
        if (offset > -24 && offset < 24) {
            this.indianOffset = offset
        }
    }

    handleTimeChange(e) {
        this.setState({
            intermediateTime: e.target.value
        })
    }

    handleTimeSubmit() {
        const intermediateTime = this.state.intermediateTime;
        if (moment(intermediateTime, this.defaultTimeFormat).isValid()) {
            this.setState({
                time: intermediateTime
            })
        }
    }

    componentWillMount() {
        console.log(this.props);
        if (!this.props.email) {
            this.props.history.replace('/login')
        }
    }

    render() {
        return (
            <div>
                <h4 className="title">
                    Hello, {this.props.email}
                </h4>
                <div className="content">
                    <div className="row">
                        <div className="col-lg-12">
                            <h4 className="subtitle">Clock</h4>
                        </div>
                        <div className="col-lg-12 mb-5">
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Set United States time:</Form.Label>
                                    <InputGroup>
                                        <Form.Control onChange={this.handleTimeChange} type="text" placeholder={this.defaultTimeFormat} />
                                        <InputGroup.Append>
                                            <Button onClick={this.handleTimeSubmit} variant="outline-secondary">Submit</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                                
                            </Form>
                        </div>
                    </div>
                    <div className="row custom">
                        <div className="col-md-12 col-lg-4 mgb-5">
                            <Time isLargeText={true} country={'United States'} time={this.getTimeWith(0)}/>
                        </div>
                        <div className="row col-lg-8">
                            <div className="col-sm-12 col-md-6">
                                <Time country={'London'} time={this.getTimeWith(this.londonOffset)}/>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <Time country={'India'} time={this.getTimeWith(this.indianOffset)}/>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-lg-12">
                            <h4 className="subtitle">Settings</h4>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <Settings country='London' changeOffset={this.changeOffsetForLondon} defaultOffset={defaultLondonOffset} offset={this.londonOffset}></Settings>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <Settings country='India' changeOffset={this.changeOffsetForIndia} defaultOffset={defaultIndianOffset} offset={this.indianOffset}></Settings>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default withRouter(Home)