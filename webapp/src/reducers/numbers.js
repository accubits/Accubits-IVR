import { LIST_NUMBERS_SUCCESS } from "../actions/numbers";

export default function (state = [], action) {
    const { type, data } = action;
    console.log(action)
    switch (type) {
        case LIST_NUMBERS_SUCCESS:
            return data;
        default:
            return state;
    }
}