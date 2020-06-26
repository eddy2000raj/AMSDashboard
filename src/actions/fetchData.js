//import {call, put,takeEvery,all} from "redux-saga/effects";
import axios from 'axios';
const API_URL=`${[process.env.REACT_APP_API_URL]}` ;

/*
function* fetchData(action){
    
  try {   
          //debugger;
           
            console.log('fetch starts');
            const successResponse = yield axios.post(API_URL,action.payload);

            //const parsedResponse = yield successResponse.json();
            
           // console.log(" Inside fecthDataServer "+successResponse.data);

            //yield put({type: 'RESET_STATE'});
            console.log('fetch done');

            yield put({type: 'FETCH_DATA_SUCCESS', payload: successResponse.data,responseType:action.payload.get("type"),componentId:action.payload.get("id")});

  } catch (e) {
    yield put({type: 'FETCH_DATA_ERROR', e});
  }
}

export function* watchFetchData() {
  yield takeEvery('FETCH_REQUESTED', fetchData)
}*/


export const LoadData = (action) => {
  return dispatch => {

    //dispatch(addTodoStarted());
    axios.post(API_URL,action.payload)
      .then(res => {
        dispatch(({ type: 'FETCH_DATA_SUCCESS',payload:res.data,responseType:action.responseType,componentId:action.componentId }));
      })
      .catch(err => {
        dispatch(({type:'FETCH_DATA_ERROR',error:err}));
      });
  };
};


