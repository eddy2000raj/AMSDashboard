import React,{Component} from "react" ;
import {connect} from "react-redux";


class TableHeader extends Component{
  
   constructor(props){
       super(props);
       this.state={"rows":this.props.rows};
       this.addRow=this.addRow.bind(this);
       this.ref=React.createRef();
   }

   addRow(e){
   	   console.log(this.ref);
        this.props.addRowToTable(this.ref.current.value);
   	  //let rows=this.state.rows ;
   	  //rows.push({"col1":this.ref.current.value,"col2":"adding"});
      //this.setState({rows:rows});
   }

   
   render(){

   	    return(<div>
   	    	   <input ref={this.ref} />
   	    	   <button className="btn btn-info" onClick={this.addRow}>AddRow</button>
   	    	   </div>)

   }

}



const mapDispatchToProps = dispatch => {
  return {
    addRowToTable: text => {
      dispatch({ type: "ADD_ROW",payload:text});
    }
  }
}

export default connect(null,mapDispatchToProps)(TableHeader) ;

