import { USER_LOGIN } from "../actions/user";

export default function (state = false, action) {
    const { type } = action;
    switch (type) {
        case USER_LOGIN:
            return {
                emailId: 'johns@accubits.com',
                firstName: 'John',
                lastName: "S"
            };
        default:
            return null;
    }
}