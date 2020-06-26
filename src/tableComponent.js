import React,{Component} from "react" ;
import {connect} from "react-redux";

class TableComponent extends Component{
  
   constructor(props){
       super(props);
       //this.state={"rows":this.props.rows};
       //this.addRow=this.addRow.bind(this);
       this.ref=React.createRef();
   }

   /*addRow(e){
   	   console.log(this.ref);
   	  let rows=this.state.rows ;
   	  rows.push({"col1":this.ref.current.value,"col2":"adding"});
      this.setState({rows:rows});
   }*/

   componentDidMount(){
     this.props.loadTable();
   }

   deleteRow(i,e){
   	  //console.log(this.ref);
   	  //let existingRows=this.state.rows ;
   	  //let removed=existingRows.splice(i,1);
   	  //rows.push({"col1":this.ref.current.value,"col2":"adding"});
      //this.setState({rows:existingRows});
      this.props.deleteRowFromTable(i)
   }

   render(){

   	    return(<div>
   	    	   <table className="table table-bordered">
                {
                	this.props.rows.map((row,i)=>
                	   <tr keys={i}><td>{row.col1}</td><td>{row.col2}</td><td onClick={this.deleteRow.bind(this,i)}>deleteRow</td>
                	   </tr>)
                }
   	    	  </table></div>)

   }

}

function mapStateToProps(state) {
  return {
      rows :state.managerReducer.rows
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    loadTable: () => {
      dispatch({ type: "INITIALLOAD"});
    },
    deleteRowFromTable: index => {
      dispatch({ type: "DELETE_ROW",payload:index});
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TableComponent) ;

