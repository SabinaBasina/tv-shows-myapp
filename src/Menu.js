import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { withAuth } from '@okta/okta-react';
import "./Menu.css";
import { checkAuthentication } from "./authentication/helpers"

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = { isAuthenticated: null }

        this.checkAuthentication = checkAuthentication.bind(this);
        this.handleNavItemSelect = this.handleNavItemSelect.bind(this);
    }

    async componentDidMount() {
      this.checkAuthentication();
    }
  
    async componentDidUpdate() {
      this.checkAuthentication();
    }

    handleNavItemSelect(eventKey) {
        if (eventKey === 1) {
          this.props.auth.login('/')
        } else if (eventKey === 2) {
          this.props.auth.logout('/')
        } 
    }

    render() {
        return(
            <Navbar inverse fixedTop className="Navbar">
              <Navbar.Header>
                <Navbar.Brand className="ButtonName">
                  <Link to="/">TvShows</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight onSelect={this.handleNavItemSelect}>

                  {!this.state.isAuthenticated && 
                    <NavItem eventKey={1}>
                      Login
                    </NavItem>}

                  {this.state.isAuthenticated && 
                    <NavItem eventKey={3}>
                      <Link to="/profile">
                        <button className="ButtonProfile">
                          {this.state.user && this.state.user.name}
                        </button>
                      </Link> 
                    </NavItem>}

                  {this.state.isAuthenticated && 
                    <NavItem eventKey={2}>
                      Logout
                    </NavItem>}

                </Nav>
              </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withAuth(Menu);