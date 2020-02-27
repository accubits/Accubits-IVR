import {
    takeEvery,
    put,
    call
} from 'redux-saga/effects';
import Axios from 'axios';
import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    LOAD_USER,
    LIST_USERS,
    LIST_USERS_SUCCESS
} from '../actions/user';
import {
    toast
} from 'react-toastify';

import {
    API
} from '../environment';

function* listUsers(action) {
    console.log('running saga', action.data)
    try {

        const axios = Axios.create({
            baseURL: API,
            headers: {
                'Authorization': localStorage.getItem('user')
            }
        });

        const response = yield call(axios.get, 'user/list', action.data);
        console.log(response)
        yield put({
            type: LIST_USERS_SUCCESS,
            data: response.data.data
        });
    } catch (error) {
        if (error.response.data.errors) {
            error.response.data.errors.forEach(error => {
                toast(error.msg, {
                    type: "error"
                })
            })
        } else if (error.response.data) {
            toast(error.response.data.data, {
                type: "error"
            })
        }
    }

}

export function* watchListUsers() {
    yield takeEvery(LIST_USERS, listUsers)
}