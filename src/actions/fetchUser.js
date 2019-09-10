import { FETCH_USERS_PENDING,FETCH_USERS_SUCCESS,FETCH_USERS_ERROR } from './action';

function fetchUsers() {
    return dispatch => {
        dispatch(fetchUsersPending());
        fetch('http://localhost:8082/rest/user/findByKey')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            //debugger;
            dispatch(fetchUsersSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchUsersError(error));
        })
    }
}

function fetchUsersPending() {
    return {
        type: FETCH_USERS_PENDING,
        payload: [],
        loading:true
    }
}

 function fetchUsersSuccess(users) {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
        loading:false
    }
}

 function fetchUsersError(error) {
    return {
        type: FETCH_USERS_ERROR,
        error: error,
        loading:false
    }
}

export default fetchUsers;
