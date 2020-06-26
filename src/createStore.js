import { createStore,combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import RootReducer from './reducers/index';
import managerReducer from './reducers/managerReducer';
/*import RootReducer from './reducers/index';
import createSagaMiddleware from "redux-saga";
import {watchFetchData} from "./actions/fetchData";


const sagaMiddleware = createSagaMiddleware();*/


/*export const middlewares = [ReduxThunk];
export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)*/

const app = combineReducers({RootReducer,managerReducer});

//export const store = createStoreWithMiddleware(store);

/*const store= createStore(app,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchFetchData);

export default store;*/

const store = createStore(app,applyMiddleware(ReduxThunk))

export default store ;

