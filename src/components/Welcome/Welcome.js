import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import User from '../../database/models/user';
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
            

            User.findOne({ googleId: response.googleId }, (err, existingUser) => {
                if (existingUser) {
                    sessionStorage.setItem('user', existingUser);
                    this.setState({ loggedIn: true });
                    return (<Redirect to={'/home'} />)
                } else {
                    const user = new User();

                    user.profile.name = response.w3.ig;
                    user.profile.email = response.w3.U3;
                    user.googleId = response.googleId;
                    user.tokens.push(response.accessToken);
                    user.ownedWeps = [];

                    user.save((err) => {
                        return user;
                    });

                    sessionStorage.setItem('user', user);
                    this.setState({ loggedIn: true });
                    return (<Redirect to={'/home'} />)
                }
            })
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