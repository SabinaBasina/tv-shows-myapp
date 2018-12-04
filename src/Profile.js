import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import "./Profile.css";
import http from 'axios';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from "./authentication/helpers";
import TvShow from './TvShow';
import { getFavorites } from './db/helpers'

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            isAuthenticated: null, 
            user: null,
            tvShows: [],
            isReady: false
        }

        this.checkAuthentication = checkAuthentication.bind(this);
    }

    async componentDidMount() {
      await this.checkAuthentication();

      this.loadShows();
    }
  
    async componentDidUpdate() {
      this.checkAuthentication();
    }

    async loadShows() {
        let ids = await getFavorites(this.state.user.email)

        var tvShows = []

        for (let index in ids) {
            let id = ids[index]
            let response = await http.get("https://api.tvmaze.com/shows/" + id);

            tvShows.push(response.data)
        }

        this.setState({ tvShows: tvShows, isReady: true })
    }

    render() {
        return(
            <div>
                {!this.state.isReady && <h3 className="text-center top">Loading...</h3>}

                {this.state.isReady && 
                <div>
                    <div className="UserName">
                        <h3>Favorites</h3>
                    </div>

                    <Grid>
                        <Row>
                            {this.state.tvShows.map(tvShowData =>(
                                <TvShow data={tvShowData} /> 
                            ))}
                        </Row>
                    </Grid>
                </div>}

            </div>
        )
    }
}

export default withAuth(Profile);