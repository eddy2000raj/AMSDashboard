import React, { useState, useEffect,useRef } from 'react';
import { connect } from "react-redux";
import properties from './queriesConfig';
import NVD3Chart from "react-nvd3";

import ReactLoader from "./loader" ;


const ReactGraph= (props)=> {

   const getX=(d)=>{

    if(props.chartName=="pieChart")
      return d.key;
    else
      return d.x;
 
  }

  const getY=(d)=>{

    if(props.chartName=="pieChart")
      return d.value;
    else
      return d.y;
  
  }
   
   const [graphDataCollection,updateGraphDataCollection]=useState([]);
   const [loaded,updateLoaded]=useState(false);
   
   //runs once after DOM loaded as requied for fetching data
   useEffect(() => {
       console.log("first use effect starts "+props.id);
       let form =properties.createRequestParams(props.query,props.type,props.useSQL,props.id);
       props.fetchGraphDataFromServer(form); 
       console.log("first use effect done starts "+props.id);
       
   },[props.query]);
   
   //runs multiple times as props changes after data fetch
   useEffect(()=>{

          console.log("second use effect starts "+props.id);
          console.log("second use effect  loaded"+props.componentId);

          if(props.id==props.componentId){

     
                //console.log("table data loaded inside second effect "+props.componentId);
                if(props.chartName=="multiBarChart"){
                  let barChartdata= properties.formatData(props.graphData);
                  updateGraphDataCollection(barChartdata);
                 
                }else{
                  updateGraphDataCollection(props.graphData);
                  
                }
               
            updateLoaded(true);

          }
          
          console.log("second use effect done "+props.id);
    
     
   },[props.componentId,props.graphData]);

  
   if(loaded){

    console.log("render starts "+props.id);

     return (
           <div class="card card-stats">
                <div class="card-header">
                  <h5 class="card-title">{props.title}</h5>  
                  <p class="card-category">{props.category}</p>
                </div>
                <div class="card-body">
                    <div class="row">
                      <div class="col-lg-12 col-12 col-md-12">
                          <NVD3Chart type={props.chartName} tooltip={{enabled: true}} datum={graphDataCollection} x={getX} y={getY} reduceXTicks ={false} 
                          height="300"  margin={{"bottom": 80}}  />  
                      </div>
                    </div>
                </div>
          </div>
           )


   }else{

     return <ReactLoader />
             
   }

  
   
   ;
}


const mapStateToProps = (store) => {
  console.log("Store", store);
  return {
    graphData: store.RootReducer.data,
    componentId:store.RootReducer.componentId
  };
};


const mapDispatchToProps = dispatch => {
  return {
    fetchGraphDataFromServer: (form) => dispatch({ type: 'FETCH_REQUESTED',payload:form })
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ReactGraph);

