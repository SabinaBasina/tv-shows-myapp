var authConfig = {
    clientId: '0oahw6kikldsPhZmX0h7',
    issuer: 'https://dev-662522.oktapreview.com/oauth2/default',
    redirectUri: 'https://tv-shows-myapp.herokuapp.com/implicit/callback',
    scope: 'openid profile email',
};

async function checkAuthentication() {
    const isAuthenticated = await this.props.auth.isAuthenticated()

    if (isAuthenticated !== this.state.isAuthenticated) {
        this.setState({ isAuthenticated: isAuthenticated })

        if (isAuthenticated && !this.state.user) {
            this.setState({ user: await this.props.auth.getUser() }) 
        }
    }
}

async function redirectToLogin({ history }) {
    history.push('/login');
}

export { checkAuthentication, redirectToLogin, authConfig };