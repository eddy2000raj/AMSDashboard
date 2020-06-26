import Immutable from 'seamless-immutable';

const initialState = Immutable({
  data: [],
  pending: false,
  error: null,
  loaded:false
});




export default function appReducer(state = initialState, action) {

  switch (action.type) {
    case "RESET_STATE":
     return initialState

 /*   case "FETCH_REQUESTED":
    return {
        ...state,loading:false,data:successResponse.data,responseType:action.responseType,componentId:action.componentId
        }*/
    
    case "FETCH_DATA_PENDING":
      return {
        ...state,loading:true
      }
    case "FETCH_DATA_SUCCESS":
        
        console.log(action.type);
        return {
        ...state,loading:false,data:action.payload,responseType:action.responseType,componentId:action.componentId
        }

    case "FETCH_DATA_ERROR":
      return {
        ...state,loading:false,error: action.error
      }
    default:
      return state;
  }

}


