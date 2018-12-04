import React, { Component } from 'react';
import './TvShow.css';
import { Link } from "react-router-dom";
import NoImage from './NoImage.jpg';
import { Col } from 'react-bootstrap';



class TvShow extends Component {
  constructor(props) {
    super(props)


  }

  render() {
    return (
      <Col className="text-center" xs={12} sm={6} md={3}>   
        <div className="TvShow"> 
          <Link to={`/tvShowDetails/${this.props.data.id}`}> 
            <div>     
              <br/> 
                <img src={this.props.data.image ? this.props.data.image.medium : NoImage} />
                {this.props.data.rating && this.props.data.rating.average &&
                  <button className="RatingTvShow"> 
                    {this.props.data.rating.average} 
                  </button>}
              <p> 
                {this.props.data.name}
                <br/>
                <span>{this.props.data.genres && 
                  this.props.data.genres.join(", ")}</span> 
              </p>
            </div>  
          </Link> 
        </div> 
      </Col>
    )
  }
}


export default TvShow;
