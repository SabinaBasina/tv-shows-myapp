import React, { Component } from 'react';
import "./Search.css";
import { Grid, Col, Row, Glyphicon } from 'react-bootstrap';


class Search extends Component {
    constructor(props) {
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    
        this.state = {
          value: ''
        };
      }
    
      handleChange(e) {
        this.setState({ value: e.target.value });
      }

      handleClick(){
        this.props.onSearchQueryChanged(this.state.value);
      }
    
      render() {
        return (
          <div className="Search">
            <Grid className="text-center">
              <Row>
                <Col>
                  <input className="InputSearch"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={e => {
                      if(e.key === 'Enter'){
                      this.handleClick()  
                      }          
                    }}
                    placeholder="Search"
                  />
                  
                  <button className="ButtonSearch"
                  onClick={this.handleClick}>
                  <Glyphicon glyph="search" />
                  </button> 
                </Col>  
              </Row>    
            </Grid> 
          </div> 
        )
      }
    }
       

export default Search;
