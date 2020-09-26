import React from 'react'
import {withRouter} from 'react-router-dom'

class Home extends React.Component {
    render() {
        return (
            <div>
                Hello from Home
            </div>
        )
    }

    componentWillMount() {
        console.log(this.props)
        if (!this.props || !this.props.location || !this.props.location.state || !this.props.location.state.isLoggedIn) {
            this.props.history.replace('/login')
        }
    }
}

export default withRouter(Home)