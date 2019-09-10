import {FETCH_USERS_PENDING, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR} from '../actions/action';

const initialState = {
  users: [],
  pending: false,
  error: null
};

export default function appReducer(state = initialState, action) {

  switch (action.type) {
    case FETCH_USERS_PENDING:
      return {
        ...state,loading:true
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,loading:false,users:action.payload
      }

    case FETCH_USERS_ERROR:
      return {
        ...state,loading:false,error: action.error
      }
    default:
      return state;
  }

}

export const getUsers = state => state.users;
export const getUsersPending = state => state.pending;
export const getUsersError = state => state.error;