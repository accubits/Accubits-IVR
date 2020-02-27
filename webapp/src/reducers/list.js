import {  LIST_USERS_SUCCESS } from "../actions/user";

export default function (state = [], action) {
    const { type, data } = action;
    console.log(action)
    switch (type) {
        case LIST_USERS_SUCCESS:
            return data;
        default:
            return state;
    }
}