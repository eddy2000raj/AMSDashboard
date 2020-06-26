import React, { Component } from 'react';
import Header from './header';
import Graph from './graph';
import ExtendedDataTable from './table';
import ReactDataTable from './reactdatatable';
import ReactGraph from './reactgraph';
import properties from './queriesConfig';
import TileContainer from './tileContainer';
import axios from 'axios';

const API_URL=`${[process.env.REACT_APP_API_URL]}` ;

class App extends Component {


  constructor(props) {

     super(props);

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

     this.listItems=[
                              {"key":"Feature Expolation Program","value":"https://jam4.sapjam.com/c/jamatsap.com/wiki/show/BGj22agSAwIRN9u6lbnmuf"},
                              {"key":"Ticket.csv","value":"http://uk-lonams1.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetCSVData?query=SELECT%0A%27%27%27%27%20%7C%7C%20t.AMVisSRNumber%20AS%20%22SR%20Number%22%2C%0At.AMVisDescription%20AS%20%22Description%22%2C%0Aacc.AMVisShortName%20AS%20%22Customer%22%2C%0Aacc.AMVisRegion%20AS%20%22Customer%20Region%22%2C%0At.AMVisContactName%20AS%20%22Reported%20By%22%2C%0At.AMVisStatus%20AS%20%22Status%22%2C%0At.AMVisSubStatus%20AS%20%22SubStatus%22%2C%0At.AMVisPriority%20AS%20%22Priority%22%2C%0At.AMVisSeverity%20AS%20%22Severity%22%2C%0Au.Name.PrimaryString%20AS%20%22Assigned%20To%22%2C%0Amanager.Name.PrimaryString%20AS%20%22Assigned%20To%20Manager%22%2C%0At.AMVisQueue%20AS%20%22Queue%22%2C%0At.AMVisAssignedTeam%20%22Team%22%2C%0AROUND(t.AMVisTimeOnAriba%20%2F%2060)%20AS%20%22On%20Ariba%20(h)%22%2C%0AROUND(t.AMVisTimeOnCustomerUpdate%20%2F%2060)%20AS%20%22On%20Ariba%20Customer%20Update%20(h)%22%2C%0AROUND(t.AMVisTimeOnCustomer%20%2F%2060)%20AS%20%22On%20Customer%20(h)%22%2C%0AROUND(t.AMVisTimeOnTSS%20%2F%2060)%20AS%20%22On%20TSS%20(h)%22%2C%0AROUND(t.AMVisTimeToSLA%20%2F%2060)%20AS%20%22Time%20To%20SLA%20(h)%22%2C%0ACASE%20SIGN(t.AMVisTimeToSLA)%20WHEN%20-1%20THEN%20FALSE%20ELSE%20TRUE%20END%20AS%20%22In%20SLA%22%2C%0At.AMVisDateCreated%20AS%20%22Date%20Created%22%2C%0At.AMVisDateClosed%20AS%20%22Date%20Closed%22%2C%0At.AMVisInstanceType%20AS%20%22Instance%20Type%22%0AFROM%20%0AAMVisTicket%20t%0ALEFT%20OUTER%20JOIN%20config.amvis.core.AMVisAccount%20acc%20USING%20t.AMVisAccount%0ALEFT%20OUTER%20JOIN%20ariba.user.core.User%20u%20USING%20t.AMVisAssignedTo%0ALEFT%20OUTER%20JOIN%20ariba.user.core.User%20manager%20USING%20u.Supervisor%0AWHERE%0At.AMVisSRNumber%20LIKE%20%2700%25%27%20AND%20(t.AMVisQueue%20IN%20(%27APP_MGMT%27%2C%27APP_MAINT_L3I%27%2C%27APP_MAINT_L3P%27%2C%27APP_MAINT_L2I%27%2C%27APP_MAINT_L2P%27%2C%27APP_MAINT_DEPLOY%27)%20%20OR%20u.Name.PrimaryString%20IS%20NOT%20NULL)"},
                              {"key":"Finance","value":"/finance"},
                              {"key":"Priority Tracker","value":"/priorityTracker"},
                              {"key":"Customer Exception","value":"/exceptions"},
                              {"key":"Manager Dashbord","value":"/managerDashboard"}];
  
  }
    
  render() {

    return (
      <div class="wrapper">
            <div class="main-panel">
               <Header resource={this.listItems}></Header>
               <div class="content">
                    <div class="container-fluid" >
                        <div class="row">
                            <div class="col-md-12">
                              <TileContainer></TileContainer>
                            </div>
                            <div class="col-md-12">
                              <ReactGraph id="1" title='AMS SR Count' category='Customer Region Wise Live' type='stackedArea' chartName='stackedAreaChart' useSQL='' query={properties.stack_chart}></ReactGraph>
                            </div>
                            <div class="col-md-12">
                               <ReactGraph id="2" title='SR Backlog Data' category='Monthly Wise'  type='json' chartName='multiBarChart' useSQL='' query={properties.backlogData}></ReactGraph>
                            </div>
                            <div class="col-md-12">
                               <ReactDataTable id="3" tableName="backlogData"  config={this.table1Config} tableTitle='Tickets Stats 2019'  type='json' query={properties.backlogData} useSQL=''></ReactDataTable>
                            </div>
                            <div class="col-md-12">
                                <ReactDataTable id="4" config={this.table2Config} tableTitle='AMS Customer List'  type='table' query={properties.example2_table} useSQL=''></ReactDataTable>
                            </div>
                            <div class="col-md-12">
                                <ReactDataTable id="5" config={this.table2Config} tableTitle='AMS Customer List'  type='table' query={properties.example2_table} useSQL=''></ReactDataTable>
                            </div>
                         </div>
                    </div>
               </div>
            </div>
      </div>
           );
  }
}



export default App ;
