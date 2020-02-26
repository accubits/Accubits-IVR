import { USER_LOGIN_SUCCESS } from "../actions/user";

export default function (state = false, action) {
    const { type, data } = action;
    console.log(action)
    switch (type) {
        case USER_LOGIN_SUCCESS:
            return data;
        default:
            return state;
    }
}