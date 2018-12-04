import React, { Component } from 'react';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

import { authConfig } from './authentication/helpers';

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.loginWidget = new OktaSignIn({
            baseUrl: authConfig.issuer.split('/oauth2')[0],
            clientId: authConfig.clientId,
            redirectUri: authConfig.redirectUri,
            //logo: '/react.svg',
            i18n: {
              en: {
                'primaryauth.title': 'Sign in to TvShows',
              },
            },
            authParams: {
              responseType: ['id_token', 'token'],
              issuer: authConfig.issuer,
              display: 'page',
              scopes: authConfig.scope.split(' '),
            },
            idps: [{
              type: 'FACEBOOK', 
              id: '0oahwlmgah447YqlK0h7'
            }, { 
              type: 'GOOGLE',
              id: '0oahwon6i1OXGugwx0h7'
            }]
        });

    }

    componentDidMount() {
        this.loginWidget.renderEl(
          { el: '#sign-in-widget' },
          () => { },
          (err) => {
            throw err;
          },
        );
      }

    render() {
        return(
            <div>
                <div id="sign-in-widget" />
            </div>
        );
    }
}

export default Login;