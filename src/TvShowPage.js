import React, { Component } from 'react';
import http from 'axios';
import TvShow from './TvShow';
import Search from './Search';
import "./TvShowPage.css"
import { Grid, Row } from 'react-bootstrap';

class TvShowPage extends Component {
  constructor(props) {
    super(props)

    this.handleSearchQueryChanged = this.handleSearchQueryChanged.bind(this);

    this.state = {
      tvShows: [],
      isReady: false
    }

    this.loadTvShows(this.props.page)
  }

  componentWillReceiveProps(newProps) {
    this.loadTvShows(newProps.page)
  }

  loadTvShows(page) {
    this.setState({ isReady: false })

    http
      .get("https://api.tvmaze.com/shows?page=" + page)
      .then(response => { 
        window.scrollTo(0, 0)
        this.setState({ tvShows: response.data, isReady: true }) 
      });
  }
 
  handleSearchQueryChanged(newQuery) { 

    if (newQuery === "") {
      this.loadTvShows(this.props.page)

      return
    }

    this.setState({ isReady: false })

    http
      .get("https://api.tvmaze.com/search/shows?q=" + newQuery)
      .then(response => { 
        this.setState({ tvShows: response.data.map(data => data.show), isReady: true }) 
      });
  
  }


  render() {
    
    return (
      
      <div>        
        <Search onSearchQueryChanged={this.handleSearchQueryChanged}/>

        {!this.state.isReady && <h3 className="text-center top">Loading...</h3>}

        {this.state.isReady && 
        <Grid> 
          <Row className="flex-row">
            {this.state.tvShows.map(tvShowData =>(
              <TvShow data={tvShowData} /> 
            ))} 
          </Row>  
        </Grid>}

     </div>     
      
    );
  }
}

export default TvShowPage;
