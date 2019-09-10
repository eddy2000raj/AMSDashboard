import React, { Component } from 'react';
//import logo from './logo.png';
//import { Link } from 'react-router-dom';
import { ButtonToolbar,DropdownButton,MenuItem } from 'react-bootstrap';
import CustomeToggle from './customeToggle' ;


function renderDropdownButton(title, i) {
  return (
    <DropdownButton
      bsStyle={title.toLowerCase()}
      title={title}
      key={i}
      id={`dropdown-basic-${i}`}
    >
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3" active>
        Active Item
      </MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>
  );
}



class Header extends Component {

  BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];

  
  render() {

    return (
      <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar bar1"></span>
                        <span className="icon-bar bar2"></span>
                        <span className="icon-bar bar3"></span>
                    </button>
                    <a className="navbar-brand" data-target="#">SAP Ariba AMS Dashboard</a>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        
                        <li>
                            <a href="#/team">
                                <i className="ti-user"></i>
                                <p>Team</p>
                            </a>
                        </li>
                   
                        <CustomeToggle>Resources</CustomeToggle>
                       
                       
                        <li>
                            <a href="#/">
                                <i className="ti-settings"></i>
                                <p>Settings</p>
                            </a>
                        </li>
                    </ul>

                </div>
            </div>
            
 </nav>
           );
  }
}

export default Header ;