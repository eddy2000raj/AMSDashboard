import React, { Component } from 'react';
import NVD3Chart from "react-nvd3";
import axios from 'axios';
import properties from './queriesConfig';
const API_URL=`${[process.env.REACT_APP_API_URL]}` ;


class Graph extends Component{

  constructor(props) {
     super(props);  
     // Don't do this!
     this.getX=this.getX.bind(this);
     this.getY=this.getY.bind(this);

     this.state = {
       query:this.props.query,
       callType:this.props.callType,
       useSQL:this.props.useSQL,
       datum:[],
       loaded:false 
     };
     
  }


  componentDidMount(){

    this.loadChartData(); 

  }

  loadChartData(query){
     
     query=query || this.props.query;
     let form =properties.createRequestParams(query,this.props.callType,this.props.useSQL);
     let promise1=axios.post(API_URL,form) ;

     promise1.then((res)=>{
                                 if(this.props.formatType=="1" && this.props.ChartType=="multiBarChart"){
                                    let bardata=this.formatBarChartData(res)
                                    this.setState({'datum':bardata,loaded:true});
                                  }else if(this.props.ChartType=="pieChart"){
                                    this.setState({'datum':res.data,loaded:true});
                                  }else{
                                    this.setState({'datum':res.data,loaded:true});
                                  }
                               })
                             .catch(function(err) {
                                 console.log('Fetch Error :-S', err);
                              });

  }

  /*componentDidUpdate(prevProps, prevState) {    

   console.log("update called");
  }*/

  componentWillReceiveProps(nextProps){
   console.log("update called"+nextProps);

    if(nextProps.query!=this.props.query){
      //this.setState({query:nextProps.query});
      this.loadChartData(nextProps.query);
    }
  }

  formatPieChartData(response){
    
  }

  formatBarChartData(response){
  
  var result=[];
    //aaa.sort((a, b) => a[3].localeCompare(b[3]));

     var result=[{'key':'Closed',values:[]},{'key':'Open',values:[]},{'key':'Backlog',values:[]}],k=0,l=0,m=0,done=true;
   
       //let values=[];
       for(let j=0;j<response.data.length;j++){
            
         let d=response.data[j];//elements in order with keys
         
          //values.push({'x':j,'y':parseInt(aaa[j][2]),'idx':aaa[j][3]});
          //result[i]['values']=values;
          result[0]['values'].push({'x':(j+1),'y':parseInt(d['closed']),'idx':d['dataYear']});
         
      
          //values.push({'x':j,'y':parseInt(aaa[j][2]),'idx':aaa[j][3]});
          result[1]['values'].push({'x':(j+1),'y':parseInt(d['opened']),'idx':d['dataYear']});
          
         
          //values.push({'x':j,'y':parseInt(aaa[j][2]),'idx':aaa[j][3]});
          result[2]['values'].push({'x':(j+1),'y':parseInt(d['backlog']),'idx':d['dataYear']});
         }
      
      
  
  return result;
}

  formatMultiBarChartData(responseArray,backlogData){

  
  //let result=[];
  let temArr=[];
  let arr=['Jan','Feb','March','April','May','June','July','August','Sep','Oct','Nov','Dec'];
   
     responseArray.sort((a, b) => a[3].localeCompare(b[3]));

     let result=[{'key':'Closed',values:[]},{'key':'Open',values:[]},{'key':'Backlog',values:[]}],k=0,l=0,m=0,done=true;
   
       //let valuess=[];
       for(let j=1;j<responseArray.length;j++){
            
         
         
         if(responseArray[j][0]=='Closed' && responseArray[j][1]==''){
           k++;
          //valuess.push({'x':j,'y':parseInt(responseArray[j][2]),'idx':responseArray[j][3]});
          //result[i]['valuess']=valuess;
          result[0]['values'].push({'x':k,'y':parseInt(responseArray[j][2]),'idx':responseArray[j][3].substring(0, 4)+'-'+arr[parseInt(responseArray[j][3].substring(5, 7))-1]});
          done=false;
         }
         
         if(responseArray[j][0]=='' && responseArray[j][1]=='Open'){
           l++;
          //valuess.push({'x':j,'y':parseInt(responseArray[j][2]),'idx':responseArray[j][3]});
          result[1]['values'].push({'x':l,'y':parseInt(responseArray[j][2]),'idx':responseArray[j][3].substring(0, 4)+'-'+arr[parseInt(responseArray[j][3].substring(5, 7))-1]});
          
           done=true;
          
         }
         
          if(backlogData!=null && backlogData[0]=='Backlogs' && done){
           m++;
          //valuess.push({'x':j,'y':parseInt(responseArray[j][2]),'idx':responseArray[j][3]});
          result[2]['values'].push({'x':m,'y':parseInt(backlogData[m]),'idx':responseArray[j][3].substring(0, 4)+'-'+arr[parseInt(responseArray[j][3].substring(5, 7))-1]});
         }
         
      }
      
      
  
  return result;
}

   getX(d){

    //console.log("Inside getX" +JSON.stringify(d));

    if(this.props.callType=="pie")
      return d.key;
    else
      return d.x;

    
  }
  getY(d){

    //console.log("Inside getY" +JSON.stringify(d));

    if(this.props.callType=="pie")
      return d.value;
    else
      return d.y;

    
  }

  render() {
    /*this.series = [{
      "key": "Serie1",
      "values": [{
        "idx": 0,
        "y": 0
      }, {
        "idx": 1,
        "y": 1
      }, {
        "idx": 2,
        "y": 2
      }],
      "color": "#ff7f0e"
    }, {
      "key": "Serie2",
      "values": [{
        "idx": 0,
        "y": 0
      }, {
        "idx": 2,
        "y": 1
      }, {
        "idx": 3,
        "y": 1
      }],
      "color": "#2ca02c"
    }];
    */
    
    


    if(this.state.loaded)
    {

    
      return ( 
      <div class="card">
          <div class="header">
            <h4 class="title"><span class="text-primary">{this.props.title}</span></h4>  
            <p class="category"><span class="text-danger">{this.props.category}</span></p>
          </div>
          <div class="content">
              <div class="row">
                <div class="col-md-12">
                    <NVD3Chart type={this.props.ChartType} tooltip={{enabled: true}} datum={this.state.datum} x={this.getX} y={this.getY}
                     reduceXTicks ={false} 
                      rotateLabels="-45" height="300" margin={{"bottom": 80}}
                    />  
                </div>
              </div>
          </div>
      </div>
      );
    }
    

       return  <div class="card"><div class="content"><h1>loading......</h1></div></div>;
  }

}

export default Graph ;