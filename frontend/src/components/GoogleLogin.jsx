import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class GoogleLogin extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('/login')
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.userInfo.name
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);

            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <h4>Login</h4>
                    <button>
                        <img src="./googleSignIn.png" alt="googleSignIn" className="googleSignInBtn" onClick={this.handleSubmit} type="submit" />
                    </button>
                </div>
            )
        }
    }
}

export default GoogleLogin