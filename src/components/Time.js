import React from 'react'

export default class Time extends React.Component {
    render() {
        return (
             <div>
                 <b>{this.props.country}</b>: {
                     this.props.isLargeText &&
                    <h3>{this.props.time}</h3>
                 }{
                    !this.props.isLargeText &&
                    <h6>{this.props.time}</h6>
                 }
             </div>
        )
    }
}


