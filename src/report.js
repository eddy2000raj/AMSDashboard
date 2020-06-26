import React, { Component } from 'react';
import Header from './header';
import Graph from './graph';
import ExtendedDataTable from './table';
import ReactDataTable from './reactdatatable';
import ReactGraph from './reactgraph';

import properties from './queriesConfig';
import TileContainer from './tileContainer';
import CustomSelect from './customeSelect';
import axios from 'axios';

const API_URL=`${[process.env.REACT_APP_API_URL]}` ;

class Report extends Component {


  constructor(props) {
     super(props);  
     this.selectedCustomer="";
     this.childloaded=false;
     this.exportToExcel = this.exportToExcel.bind(this);
     this.reloadConfig=this.reloadConfig.bind(this);

     this.state={
                  "graph1Query":properties.openSRsCountbyCustomer(this.selectedCustomer),
                  "graph2Query":properties.weeklyTrendAnalysis(this.selectedCustomer),
                   "table1Query":properties.openSRrsbyCustomer(this.selectedCustomer),
                   "enableDownload":true
                }

     this.selectConfig={
       query:properties.example2_table,
       key:"AMVisUniqueName",
       value:"AMVisName",
       reloadConfig:this.reloadConfig
     }

     
     this.table1Config={
       
     }
     this.table2Config={
      "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                      var clients=['IBM','Ford','Nokia','Intel','SCB','CVS','LVS','PPG','Lenovo','Amgen','HZL','Nestle','Auchan','Tapestry','Ferrero'];
                      if ( clients.includes(aData[0]) )
                      //$(nRow).addClass( "hightlightRow" );
                      return nRow;
                    },
       columnDefs: [
            {
                targets:0,
                render: function ( data, type, row, meta ) {

                    if(type === 'display'){
                        data='<a href="http://localhost:3000/customer.html?name=' + encodeURIComponent(data) + '&uniqueName=' + encodeURIComponent(row[3]) +'">' + data + '</a>'
                    }

                    return data;
                }
            },
            { 
              targets:3,
              "visible": false,
            },
            { 
              targets:4,
              "visible": false,
            }
        ]
     }  
  
  }

  reloadConfig(e){
      console.log('inside report ---from select value'+e);
      this.selectedCustomer=e.target.value;
      let enabaled=true;

      if(this.selectedCustomer!="")
      enabaled=false   
      
      this.setState({
        "graph1Query":properties.openSRsCountbyCustomer(this.selectedCustomer),
        "graph2Query":properties.weeklyTrendAnalysis(this.selectedCustomer),
        "table1Query":properties.openSRrsbyCustomer(this.selectedCustomer),
        "enableDownload":enabaled
      })
  }


  exportToExcel(){

    const form =new FormData();
    form.append("isExcelDownload","true");
    form.append("useSQL","true,true,false");
    //form.append("AMVisUniqueName",this.selectedCustomer);
    form.append("QueriesMap",JSON.stringify({"openSRsCountbyCustomer":this.state.graph1Query,"weeklyTrendAnalysis":this.state.graph2Query,"openSRrsbyCustomer":this.state.table1Query}));

    const req=new URLSearchParams(form);
    const promise=axios.post(API_URL,req) ;
    promise.then((res)=>{

           alert(JSON.stringify(res));
                            //window.open("/sr/dashboard/report/Output.xlsx");     
                        })
                        .catch(function(err) {
                                 console.log('Fetch Error :-S', err);
                        });



  }
   
 
  render() {

    return (
      <div class="wrapper">
            <div class="main-panel">
               <Header></Header>
               <div class="content">
                    <div class="container-fluid" >
                        <div class="row">
                            <div class="col-md-12">
                              <div class="row">
                                  <div class="col-md-3 pull-left">
                                      <button disabled={this.state.enableDownload} class="btn btn-info" onClick={this.exportToExcel}>ExportToExcel</button>
                                  </div>
                                  <div class="col-md-3 pull-right">
                                      <CustomSelect config={this.selectConfig}></CustomSelect>
                                  </div>
                              </div>
                            </div>
                            
                            <div class="col-md-6">
                              <ReactGraph id="1" title='Open SR Summary' category='Region Wise' type='pie'  chartName='pieChart' useSQL='true' query={this.state.graph1Query}>
                              </ReactGraph>
                            </div>
                            <div class="col-md-6">
                               <ReactGraph  id="2" title='Weekly Trend Analysis' category='Last 10 Weeks' type='stackedArea'  chartName='multiBarChart' useSQL='true' query={this.state.graph2Query}></ReactGraph></div> 
                            <div class="col-md-12">
                              <ReactDataTable id="3"  tableTitle='Open SRs for customer'  type='table' query={this.state.table1Query} useSQL=''></ReactDataTable>
                            </div>

                        </div>
                    </div>
               </div>
            </div>
      </div>
           );
  }
}



export default Report ;
