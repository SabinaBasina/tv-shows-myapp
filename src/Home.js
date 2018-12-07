import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './Home.css';
import TvShowPage from './TvShowPage';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0
    }
  }

  increment() {
    this.setState({
      page: this.state.page + 1
    })
  }

  decrement() {
    this.setState({
      page: this.state.page - 1
    })
  }

  render() {
    
    return (
      
        <div>    
          
          <TvShowPage page={this.state.page} />

          <Grid>
            <Row className="Pager" >

              <Col className="text-center" xs={6} sm={6} md={6}>
                
                {this.state.page > 0 &&
                  <button onClick={(e) => this.decrement(e)}>
                    &larr; Previous Page
                  </button>
                }
              </Col>

              <Col className="text-center" xs={6} sm={6} md={6} >
                <button onClick={(e) => this.increment(e)}>
                  Next Page &rarr;
                </button>
              </Col>

            </Row>
          </Grid>   
          

        </div>
      
    );
  }
}

export default Home;