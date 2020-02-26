import { combineReducers } from 'redux'

import user from './user';

export default combineReducers({
    user
});

export const INITIAL_STATE = {
    user: null
}