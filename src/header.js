import React, { Component } from 'react';
//import logo from './logo.png';
//import { Link } from 'react-router-dom';
import { ButtonToolbar,DropdownButton,Nav,NavItem,Navbar,NavDropdown,DropdownItem,Dropdown } from 'react-bootstrap';
import CustomeToggle from './customeToggle' ;



class Header extends Component {

   constructor(props,context){
      super(props, context);
      this.handleClick = this.handleClick.bind(this);
      this.handleBlur=this.handleBlur.bind(this);
      this.handleNavbarToggal = this.handleNavbarToggal.bind(this);
      this.resourceConfig=[{"title":"Report","link":"/report"}];

      this.state={
                  "DropClose":"dropdown-menu dropdown-menu-right",
                  "NavbarToggal":"collapse navbar-collapse",
                  "dropdown":"dropdown"
                };
   }

   componentWillMount(){
     document.addEventListener("mousedown",this.handleBlur,false);
   }

   handleNavbarToggal(e){
      e.preventDefault();

      if(this.state.NavbarToggal.indexOf("show")!=-1)
        this.setState({"NavbarToggal":"collapse navbar-collapse"});
      else
       this.setState({"NavbarToggal":"collapse navbar-collapse show"});

   }


   handleClick(e) {
    //e.preventDefault();
    if(this.state.dropdown.indexOf("show")==-1){
      //this.setState({"DropClose":"dropdown-menu dropdown-menu-right show"});
      this.setState({"dropdown":"dropdown show"});
    }
      
    else{
     //this.setState({"DropClose":"dropdown-menu dropdown-menu-right"});
     this.setState({"dropdown":"dropdown"});
    }
  }

  handleBlur(e){
    //e.preventDefault();

    if(this.node.contains(e.target)){
       return ;
        
    }else{
     //this.setState({"DropClose":"dropdown-menu dropdown-menu-right"});
     this.setState({"dropdown":"dropdown"});
    }
   
  }



  
  render() {

    return (

  <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
  <a class="navbar-brand" href="#">SAP Ariba AMS Dashboard</a>
  <button class="navbar-toggler" type="button" onClick={this.handleNavbarToggal} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class={this.state.NavbarToggal} id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      {/*<li class="nav-item">
        <a class="nav-link" href="#">Switch Dashboard</a>
      </li>*/}
      <li class="nav-item">
        <a class="nav-link" href="#">Team</a>
      </li>
      <li class={`nav-item ${this.state.dropdown}`}  ref={node=>this.node=node}>
        <a class="nav-link dropdown-toggle"  onClick={this.handleClick}   href="javascript:void(0)" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Resources
        </a>
        <div className={this.state.DropClose} aria-labelledby="navbarDropdown">
          {
            this.props.resource.map((a)=><a class="dropdown-item" href={a.value}>{a.key}</a>)
          }
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Settings</a>
      </li>
      
    </ul>
  </div>
</nav>
        

           );
  }
}

export default Header ;

