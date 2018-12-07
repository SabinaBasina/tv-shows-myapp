import React, { Component } from 'react';
import './Episode.css';
import NoImageEpisode from './NoImageEpisode.jpg';
import { Grid, Row, Col } from 'react-bootstrap';



class TvShow extends Component {
  constructor(props) {
    super(props)


  }

  render() {
    return (
        <Grid className="text-center Episode">

            <Row>            
                <Col className="text-center SeasonNumber" xs={12} sm={12} md={1} >
                    <b>{this.props.data.season} x {this.props.data.number}</b>
                </Col> 
            
                <Col className="text-center" xs={12} sm={12} md={4}>
                    <img src={this.props.data.image ? this.props.data.image.medium : NoImageEpisode} />
                </Col>

                <Col className="text-justify" xs={12} sm={12} md={7}>
                    <h4>{this.props.data.name}</h4>
                    <p dangerouslySetInnerHTML={{__html: this.props.data.summary}}/>
                </Col>   

            </Row>

        </Grid>
    )
  }
}


export default TvShow;
