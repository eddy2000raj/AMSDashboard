import React, { Component } from 'react';
import './assets/css/jquery.dataTables.min.css';

const $  =require('jquery') ;
 $.DataTable = require('datatables.net') ;

class ExtendedDataTable extends Component{

  componentDidMount(){

   console.log(this.el);
   this.$el=$(this.el);


   this.$el.DataTable({
        data: this.props.data,
        columns: [
            { title: "Name" },
            { title: "Position" },
            { title: "Office" },
            { title: "Extn." },
            { title: "Start date" },
            { title: "Salary" }
        ]
    });

  }

  componentWillUnmount(){

  }

  render() {


   
    return ( 
            <div>
      <table  class="display" width="100%" ref={el=>this.el=el}></table>
            </div>
           );
  }

}

export default ExtendedDataTable ;