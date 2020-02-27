import { combineReducers } from 'redux'

import user from './user';
import users from './users';
import numbers from './numbers';

export default combineReducers({
    user,
    users,
    numbers
});

export const INITIAL_STATE = {
    user: null,
    users: [],
    numbers: []
}