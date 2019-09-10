import React, { Component } from 'react';

class CustomToggle extends Component {


  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.state={"DropClose":"dropdown"};
  }

  handleClick(e) {
    e.preventDefault();
    if(this.state.DropClose=="dropdown")
      this.setState({"DropClose":"dropdown open"});
    else
     this.setState({"DropClose":"dropdown"});
  }

  render() {
    return (
                      <li className={this.state.DropClose} >
                              <a data-target="#" className="dropdown-toggle" data-toggle="dropdown" onClick={this.handleClick}>
                                    <i className="ti-book"></i>
                                    <p>{this.props.children}</p>
                                    <b className="caret"></b>
                              </a>
                              <ul className="dropdown-menu">
                                <li><a >Feature Exploration Program</a></li>
                                <li><a >Tickets.csv</a></li>
                              </ul>      
                        </li>
      );
  }
}


export default CustomToggle 


