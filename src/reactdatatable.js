import React, { useState, useEffect,useRef } from 'react';
import { connect } from "react-redux";
import properties from './queriesConfig';
import {LoadData} from './actions/fetchData';
import ReactLoader from "./loader" ;

const $  =require('jquery') ;
$.DataTable =require('datatables.net') ;


/*const processResultData=()=>{

}*/

const ReactDataTable= (props)=> {

   const el=useRef(null);
   const $el=useRef(null) ;
   const $api=useRef(null);
   
   
   const [tableCollection,updateTableCollection]=useState([]);
   const [loaded,updateLoaded]=useState(false);
   
   //runs once after DOM loaded as requied for fetching data
   useEffect(() => {
       console.log("first use effect starts "+props.id);
       let form =properties.createRequestParams(props.query,props.type,props.useSQL,props.id);
       props.fetchDataFromServer(form); 
       console.log("first use effect done starts "+props.id);
       
   },[props.query]);
   
   //runs multiple times as props changes after data fetch
   useEffect(()=>{

          console.log("second use effect starts "+props.id);
          console.log("second use effect  loaded"+props.componentId);

          if(props.id==props.componentId){

            if(props.tableData.length>0){

                console.log("table data loaded inside second effect "+props.componentId);
                updateTableCollection(props.tableData);
                
            }

            updateLoaded(true);

          }
          
          console.log("second use effect done "+props.id);
    
     
   },[props.componentId,props.tableData]);
   
   //runs multiple times as tableCollection changes
   useEffect(()=>{
     
    console.log("third use effect starts "+props.id);
    let result={
                   'tableData':[],
                   'tableHeader':[{'title':"Column1"}]
                };

    if(tableCollection.length>0){

        console.log(props.id +" tableCollection inside third effect $el-->"+el.current);

        if(props.tableName=="backlogData"){

          let data=properties.formatData(tableCollection);
          result=properties.formatTableData(data);

        }else{

        let tableHeader=tableCollection.shift();
        tableHeader=tableHeader.map((item,index)=>{
                        return {'title':item};
                       });
        result['tableData']=tableCollection || [] ;
        result['tableHeader']=tableHeader || result['tableHeader'] ;
        }

        if($el.current==null){

         $el.current=$(el.current);
          //creating new datatable
         $api.current= $el.current.DataTable({
              data: result['tableData'],
              columns: result['tableHeader']
          });
          
        }else{
          
          $api.current.clear();
          $api.current.rows.add(result['tableData']);
          $api.current.draw();

        }
       

    }


    console.log("third use effect ends "+props.id);
    


   },[tableCollection])

  
   if(loaded){

    console.log("render starts "+props.id);

     return (
           <div class="card card-stats">
                          <div class="card-header">
                             <h4 class="card-title text-muted">{props.tableTitle}</h4>  
                          </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <table  class="display" key={props.id} width="100%" ref={el}></table>
                                    </div>
                                </div>
                             </div>
            </div>
           )


   }else if(loaded && tableCollection.length==0){

    return( <div class="card card-stats">
            <div class="card-header">
              <h4 class="card-title text-muted">{props.tableTitle}</h4>  
            </div>
            <div class="card-body">
                  <h1>No Data Found</h1>
            </div>
    </div>);

   }else{
     return (
            <ReactLoader />
            )
   }

    console.log("render ends "+props.id);
   
   ;
}


const mapStateToProps = (store) => {
  console.log("Store", store);
  return {
    tableData: store.RootReducer.data,
    componentId:store.RootReducer.componentId
  };
};


const mapDispatchToProps = dispatch => {
  return {
    fetchDataFromServer: (form) => LoadData(form)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ReactDataTable);

