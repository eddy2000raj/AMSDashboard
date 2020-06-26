import React, { Component } from 'react';
import { connect } from 'react-redux';
import './assets/css/jquery.dataTables.min.css';
import properties from './queriesConfig';

const $  =require('jquery') ;
$.DataTable =require('datatables.net') ;

class ExtendedDataTable extends Component{
  

  constructor(props) {
     super(props);  
     this.state = {data:[],headers:[],done:false,error:false};
     this.counter=0;
     this.table=undefined ;
  }

  componentDidMount(){

   this.loadTableData();    

  }

  loadTableData(query){
    query=query || this.props.query ;
    let form =properties.createRequestParams(query,this.props.type,this.props.useSQL);
    this.props.fetchDataFromServer(form);    
  }

  formatData(response){
  
  //let result=[];
    //aaa.sort((a, b) => a[3].localeCompare(b[3]));

     let result=[{'key':'Closed',values:[]},{'key':'Open',values:[]},{'key':'Backlog',values:[]}],k=0,l=0,m=0,done=true;
   
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

  //-----------
  formatTableData(data){

  let result={};
 
  let tableData=[['Backlog',0,0,0,0,0,0,0,0,0,0,0,0],
  ['Closed',0,0,0,0,0,0,0,0,0,0,0,0],
  ['Open',0,0,0,0,0,0,0,0,0,0,0,0]];
  let backlogHeader=[{'title':'Tickets Stats'}];

  let backlog=tableData[0];
  let closed=tableData[1];
  let open=tableData[2];

  for(let v in data){
  
      if(data[v]['key']=="Backlog"){
   
       let i=1;
      for(let b in data[v]['values']){
      
      let value=data[v]['values'][b];      
      backlog[i]=value['y'];
      tableData[0]=backlog;

      var obj={};
      obj['title']=value['idx'];
      backlogHeader.push(obj);

         i++;
      }
    
      //tableData[0]=.concat(backlog);
  
      }
  
      if(data[v]['key']=="Closed"){
   
        let i=1;
      for(let b in data[v]['values']){
      
      let value=data[v]['values'][b]
      
      
      closed[i]=value['y'];
      tableData[1]=closed;
        i++
      }
    
      //tableData[1].push(closed);
      //tableData[1]=tableData[1].concat(closed);
  
      }
  
      if(data[v]['key']=="Open"){
   
        let i=1;
      for(let b in data[v]['values']){
      
      let value=data[v]['values'][b];
      
      
      open[i]=value['y'];

      tableData[2]=open;
      
      i++;
      }
    
      //tableData[2].push(open);
      //tableData[2]=tableData[2].concat(open);
  
      }
   
}

    
    //callback(tableData,backlogHeader);

    result['tableData']=tableData || [];
    result['tableHeader']=backlogHeader || [{'title':"Column1"},{'title':"Column2"}];

    return result;
  
}  


/*shouldComponentUpdate(nextProps, nextState){

  if((nextProps.data.length!=this.props.data.length)){
    return true;
  }

  return false;

}*/




  componentWillReceiveProps(nextProps) {
     console.log('componentWillReceiveProps', nextProps);
     //this.counter++;

     if(nextProps.query!=this.props.query){
          this.loadTableData(nextProps.query);
     }else{

           let result={
               'tableData':[],
               'tableHeader':[{'title':"Column1"}]
           };

           //console.log(this.props.responseType +"-- "+nextProps.responseType);

           if((this.props.data.length!=nextProps.data.length) && this.props.type=="json" && nextProps.responseType=="json"){
              console.log("inside 1");
              let data=this.formatData(nextProps);
              result=this.formatTableData(data);
              this.setState({'data':result.tableData,'headers':result.tableHeader,done:true,error:false});
           }

           if((this.props.data.length!=nextProps.data.length) && this.props.type=="table" && nextProps.responseType=="table"){
             
             console.log("inside 2");
             let data=nextProps.data;
             let tableHeader=data.shift();

             tableHeader=tableHeader.map((item,index)=>{
                    return {'title':item};
                   });

             result['tableData']=data || [];
             result['tableHeader']=tableHeader || [{'title':"No Columns found"}];
             this.setState({'data':result.tableData,'headers':result.tableHeader,done:true,error:false});
               
           }


     }   
     
  }

  componentDidUpdate(prevProps, prevState) {

   console.log(prevProps);
   
   if(this.state.done && this.props.responseType==prevProps.type){
     
      this.$el=$(this.el);

      let config={
          data: this.state.data,
          columns:this.state.headers
      };

      config={
        ...config,
        ...this.props.config
      }
      //debugger;

      if(this.table)
      this.table.destroy();

      this.table=this.$el.DataTable(config);      
      
   }
  
  
  }


  render() {

   if(this.state.done && !this.state.error){
     return (
            <div class="card">
                          <div class="header">
                            <h4 class="title"><span class="text-primary">{this.props.tableTitle}</span></h4>  
                          </div>
                            <div class="content">
                                <div class="row">
                                    <div class="col-md-12">
                                        <table  class="display" width="100%" ref={el=>this.el=el}></table>
                                    </div>
                                </div>
                             </div>
            </div>
           );

   }
    

    return  <div class="card"><div class="content"><h1>loading......</h1></div></div>;
  }



}

const mapStateToProps = (store) => {
  console.log("Store", store);
  return {
    data: store.RootReducer.data,
    responseType:store.RootReducer.responseType
  };
};


const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    fetchDataFromServer: (form) => dispatch({ type: 'FETCH_REQUESTED',payload:form })
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ExtendedDataTable);
