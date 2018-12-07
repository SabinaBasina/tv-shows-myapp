import React, { Component } from 'react';
import http from 'axios';
import Episode from './Episode';

class Episodes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tvShow: []
        }

        
    http
        .get("http://api.tvmaze.com/singlesearch/shows?q=" + this.props.nameTvShow + "&embed=episodes")
        .then(response => {
        this.setState({ tvShow: response.data}) 
    });
      
    }

    
    render() {
      return (
        <div> 
            {this.state.tvShow._embedded && 
            this.state.tvShow._embedded.episodes.map(episode =>(
                <Episode data={episode} /> 
            ))} 
        </div>    
      )
    }
}

export default Episodes;