import React, { Component } from 'react';
//import { Link } from "react-router-dom";
import {DropdownButton,MenuItem} from 'react-bootstrap';

class CustomToggle extends Component {


  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur=this.handleBlur.bind(this);
    this.linkClick=this.linkClick.bind(this);
    this.state={"DropClose":"dropdown"};
  }

  handleClick(e) {
    e.preventDefault();
    if(this.state.DropClose=="dropdown")
      this.setState({"DropClose":"dropdown open"});
    else
     this.setState({"DropClose":"dropdown"});
  }

  handleBlur(e){
    e.preventDefault();
    this.setState({"DropClose":"dropdown"});
  }

  linkClick(v){
    alert(v);
  }

  

  render() {
    return (
                       /*<li className={this.state.DropClose}  onBlur={this.handleBlur}>
                              <a data-target="#" className="dropdown-toggle" data-toggle="dropdown"  tabIndex="0"  onClick={this.handleClick}>
                                    <i className="ti-book"></i>
                                    <p>{this.props.children}</p>
                                    <b className="caret"></b>
                              </a>
                              <ul className="dropdown-menu" >
                                <li key="0" ><a href='/' ></a></li>
                                <li key="1" ><a href='/report'></a></li>
                              </ul>      
                        </li>*/
       <DropdownButton
      bsStyle={this.props.children}
      title={this.props.children}
      key="0"
      id="0"
    >
      
     
    </DropdownButton>
      );
  }
}


export default CustomToggle 
