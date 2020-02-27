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
    USER_LOGIN_FAILED
} from '../actions/user';
import {
    toast
} from 'react-toastify';

import {
    API
} from '../environment';

const axios = Axios.create({
    baseURL: API
    /* other custom settings */
});


function* loadUser() {
    try {
        const token = localStorage.getItem('user');
        if (token) {
            yield put({
                type: USER_LOGIN_SUCCESS,
                data: {
                    token
                }
            });
        }else{
            yield put({
                type: USER_LOGIN_FAILED,
            });
        }
    } catch (error) {

    }

}

function* loginUser(action) {
    console.log('running saga', action.data)
    try {
        const response = yield call(axios.post, 'user/login', action.data);
        console.log(response)
        localStorage.setItem('user', response.data.token)
        yield put({
            type: USER_LOGIN_SUCCESS,
            data: response.data
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

export function* watchLoginUser() {
    yield takeEvery(USER_LOGIN, loginUser)
}

export function* watchLoadUser() {
    yield takeEvery(LOAD_USER, loadUser)
}