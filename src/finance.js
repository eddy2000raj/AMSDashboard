import React, { Component } from 'react';
import Header from './header';

//import { loadUsers} from "./actions/index" ;
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';

//import fetchUsersAction from './actions/fetchUser';

class Finance extends Component {


  componentWillMount(){
   //this.props.fetchUsers();
  }
  render() {
    
    return (
      <div class="wrapper">
            <div class="main-panel">
               <Header></Header>
               <div class="content">
                    <div class="container-fluid" >
                        <div class="row">
                            <div class="col-md-6">Finance Page</div>
                            <div class="col-md-6">Designed</div>
                        </div>
                    </div>
               </div>
            </div> 
      </div>

           );
  }
}


export default Finance;
 
/*const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUsers: fetchUsersAction
}, dispatch)

const mapPropsToState = state => {
  return {
    users:state.users,
    loading:state.loading
  }
}

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(App) ;
*/