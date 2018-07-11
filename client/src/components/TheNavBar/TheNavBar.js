import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import './TheNavBar.css';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'
  
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class TheNavBar extends Component {

    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Router>
            <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Hovercraft Racing</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    <NavLink href="/components/">The Track</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/components/">About</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">Login</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>

            {/* <Route exact path="/" component={App}/>
            <Route path="/about" component={Chatrooom}/>
            <Route path="/topics" component={Topics}/> */}
            


            </div>
            </Router>
        )
    }
}

export default TheNavBar;







 

  