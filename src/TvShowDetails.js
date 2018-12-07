import React, { Component } from 'react';
import "./TvShowDetails.css"
import http from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import NoImage from './NoImage.jpg';
import Episodes from './Episodes';
import { checkAuthentication } from "./authentication/helpers"
import { withAuth } from '@okta/okta-react';
import { addFavorite, deleteFavorite, getFavorites } from "./db/helpers"

class TvShowDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
          isAuthenticated: null,
          tvShow: {},
          isReady: false,
          isFavorite: false,
          isFavoriteReady: false
        }

        this.addFavorite = this.addFavorite.bind(this);
        this.deleteFavorite = this.deleteFavorite.bind(this);
        this.checkAuthentication = checkAuthentication.bind(this);
    }

    async componentDidMount() {
        await this.checkAuthentication();

        let tvShow = (await http.get("https://api.tvmaze.com/shows/" + this.props.id)).data
       
        let favorites = this.state.isAuthenticated ? await getFavorites(this.state.user.email) : []

        this.setState({ 
            tvShow: tvShow, 
            isFavorite: favorites.includes(tvShow.id + "") ,
            isReady: true,
            isFavoriteReady: true
        })
    }
    
    async componentDidUpdate() {
        this.checkAuthentication();
    }

    async addFavorite() {
        this.setState({ isFavoriteReady: false })

        await addFavorite(this.state.user.email, this.state.tvShow.id)

        this.setState({ isFavorite: true, isFavoriteReady: true })
    }

    async deleteFavorite() {
        this.setState({ isFavoriteReady: false })

        await deleteFavorite(this.state.user.email, this.state.tvShow.id)

        this.setState({ isFavorite: false, isFavoriteReady: true })
    }
    
    render() {
      return (
        <div> 

            {!this.state.isReady && <h3 className="text-center top">Loading...</h3>}

            {this.state.isReady && 
            <Grid className="top">
                <Row className="text-center">
                    <Col className="TvShowName">
                        <h1>{this.state.tvShow.name}</h1>
                       
                    </Col>
                </Row>
                    
                <Row>
                    <Col className="text-center" xs={12} sm={12} md={3} >
                            <img src={this.state.tvShow.image === undefined ? NoImage : this.state.tvShow.image.medium} />
                            {this.state.isAuthenticated &&
                                <div>
                                    {!this.state.isFavoriteReady && <h4>Saving...</h4>}
                                    {this.state.isFavoriteReady && this.state.isReady && !this.state.isFavorite &&
                                        <button className="ButtonAdd" onClick={this.addFavorite} >
                                            Add
                                        </button>}
                                    {this.state.isFavoriteReady && this.state.isReady && this.state.isFavorite &&
                                        <button className="ButtonAdd" onClick={this.deleteFavorite} >
                                            Delete
                                        </button>}
                                </div>
                            }
                    </Col>    
                    
                    <Col className="text-justify" xs={12} sm={12} md={9}>    
                        <div className="TvShowSummary">
                            <p dangerouslySetInnerHTML={{__html: this.state.tvShow.summary}}/>
                            <br/>                          
                            <b>Genres:</b> {this.state.tvShow.genres && this.state.tvShow.genres.join(", ")} 
                            <br/>
                            <b>Country:</b> {this.state.tvShow.network && this.state.tvShow.network.country.name} 
                            <br/>
                            <b>Premiered:</b> <time>{this.state.tvShow.premiered}</time>
                        </div>
                    </Col>

                </Row>

                <Row className="text-center">
                    <Col className="Episodes">
                        <p>Episodes</p>
                    </Col>
                </Row>
                
                <Row>
                    <Episodes nameTvShow = {this.state.tvShow.name} />
                </Row>

            </Grid>}
            
          </div>    
      )
    }
}

export default withAuth(TvShowDetails);