const initialState = {
  rows: [{"id":0,"col1":"col1","col2":"col2"}]
};

export default function managerReducer(state = initialState, action) {

  switch (action.type) {
    
    case "INITIALLOAD":
     return initialState
    case "ADD_ROW":
      let id=state.rows.length;
      return {
        ...state,
        rows:[...state.rows,{"id":id,"col1":action.payload,"col2":"dispatch Action"}]
       }
    case "DELETE_ROW":
        return {
          ...state,
          rows:state.rows.filter(row => row.id !== (action.payload))
        }
    default:
      return state;
  }

}


