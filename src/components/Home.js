import React from 'react'
import {withRouter} from 'react-router-dom'
import * as moment from 'moment'
import { Form, Button, FormControl, InputGroup} from 'react-bootstrap'
import Time from './Time';
import Settings from './Settings';


class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            time: moment().utcOffset(-7).format('hh:mm:ss')
        }
        this.defaultTimeout = 1;
        this.defaultTimeFormat = 'HH:mm:ss';
        this.handleTimeChange = this.handleTimeChange.bind(this)
        this.handleTimeSubmit = this.handleTimeSubmit.bind(this)
        this.updateTime = this.updateTime.bind(this)
        this.getTimeWith = this.getTimeWith.bind(this)
        this.changeOffsetForIndia = this.changeOffsetForIndia.bind(this)
        this.changeOffsetForLondon = this.changeOffsetForLondon.bind(this)
        this.setTime = this.setTime.bind(this)
        this.timeout = setInterval(this.updateTime, this.defaultTimeout * 1000)
        this.londonOffset = 8;
        this.indianOffset = 12.5;
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
        console.log('Logging India')
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
                        Set United States Time: 
                        <Form>
                            <InputGroup className="text-centre">
                                <FormControl
                                onChange={this.handleTimeChange}
                                placeholder="hh:mm:ss"
                                aria-label="hh:mm:ss"
                                aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                <Button onClick={this.handleTimeSubmit} variant="outline-secondary">Submit</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    </div>
                    <div className="row custom">
                        <div className="col-md-12 col-lg-4">
                            <Time isLargeText={true} country={'United States'} time={this.getTimeWith(0)}/>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <Time country={'London'} time={this.getTimeWith(this.londonOffset)}/>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <Time country={'India'} time={this.getTimeWith(this.indianOffset)}/>
                        </div>
                    </div>
                    <Settings country='London' changeOffset={this.changeOffsetForLondon} offset={this.londonOffset}></Settings>
                    <Settings country='India' changeOffset={this.changeOffsetForIndia} offset={this.indianOffset}></Settings>
                </div>
            </div>
        )
    }

}

export default withRouter(Home)