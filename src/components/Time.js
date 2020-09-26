import React from 'react'

export default class Time extends React.Component {
    render() {
        return (
             <div>
                 {this.props.country}: {
                     this.props.isLargeText &&
                    <h4>{this.props.time}</h4>
                 }{
                    !this.props.isLargeText &&
                    <h6>{this.props.time}</h6>
                 }
             </div>
        )
    }
}


