import React, { Component } from 'react';
//import { Link } from "react-router-dom";
import axios from 'axios';
import properties from './queriesConfig';
const API_URL=`${[process.env.REACT_APP_API_URL]}` ;

class CustomSelect extends Component {


  constructor(props, context) {
    super(props, context);
    //this.loadCustomerData=this.loadCustomerData.bind(this);
    /*this.handleClick = this.handleClick.bind(this);
    this.handleBlur=this.handleBlur.bind(this);
    this.linkClick=this.linkClick.bind(this);
    this.state={"DropClose":"dropdown"};*/
    this.state = {data:[] };
  }

  /*handleClick(e) {
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
  }*/


  componentDidMount(){
    const form =properties.createRequestParams(this.props.config.query,'json','');
    const promise=axios.post(API_URL,form) ;

    promise.then((res)=>{
                          this.setState({'data':res.data});                        
                        }).catch(function(err) {
                          console.log('Fetch Error :-S', err);
                        });
  }

  
  renderOptions(){
    if(this.state.data.length>0)
    {
    return this.state.data.map((v,i)=><option value={v[this.props.config.key]}>{v[this.props.config.value]}</option>)
    } else{
      return  <option >loading......</option>
    }                                         

  }

  /*loadCustomerData(e){
   //alert(e.target.value);
   this.props.config.reloadConfig(e.target.value);
  }*/
  render() {
    return (
              <div class="form-group">
                    <select  class="form-control" name="customer" onChange={this.props.config.reloadConfig}>
                                               <option value="" selected>Select Customer</option>
                                               {this.renderOptions()}
                    </select> 
              </div>
      );
  }
}


export default CustomSelect 


