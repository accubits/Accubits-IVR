import { combineReducers } from 'redux'

import user from './user';
import list from './list';

export default combineReducers({
    user,
    list
});

export const INITIAL_STATE = {
    user: null,
    list: []
}