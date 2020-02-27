import {
    USER_LOGIN_SUCCESS, USER_LOGIN_FAILED
} from "../actions/user";

export default function (state = false, action) {
    const {
        type,
        data
    } = action;
    console.log(action)
    switch (type) {
        case USER_LOGIN_SUCCESS:
            return data;
        case USER_LOGIN_FAILED:
            return false;
        default:
            return state;
    }
}