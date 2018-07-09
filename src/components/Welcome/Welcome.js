import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import './Welcome.css';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: false,
            redirect: false
        };
    }

    render() {

        if (this.state.redirect || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/home'} />)
        }

        const responseGoogle = (response) => {
            console.log("google console");
            console.log(response);           
        }

        return (

            <div>

                <GoogleLogin
                    clientId="771051909767-d73k2p7p73c8gvndkna7s0eikkh84ciu.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle} />

            </div>
        );
    }
}

export default Welcome;