import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
//import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Welcome.css';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: false,
            redirect: false,
            loggedIn: false
        };
    }


    render() {

        const responseGoogle = (response) => {
            console.log("google console");
            console.log(response);

            let userObject = response;
           // sessionStorage.setItem('user', user);

            axios({
                method: 'post',
                url: '/user',
                data: {
                    profile: {
                        name: userObject.w3.ig,
                        email: userObject.w3.U3
                    },
                    googleId: userObject.googleId,
                    tokens: userObject.accessToken,
                    ownedWeps: []
                }
            }).then(response => {
                console.log(response);
            });
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