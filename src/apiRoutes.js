
export let getAccount = (req, res) => {

}
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