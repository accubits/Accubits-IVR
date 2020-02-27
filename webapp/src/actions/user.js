export const LIST_USERS = 'list_users';
export const LIST_USERS_SUCCESS = 'list_users_success';

export const LOAD_USER = 'load_user';
export const USER_LOGIN = 'user_login';

export const USER_LOGIN_SUCCESS = 'user_login_success';
export const USER_LOGIN_FAILED = 'user_login_failed';

export const USER_REGISTER = 'user_register';
export const USER_REGISTER_SUCCESS = 'user_register_success';
export const USER_REGISTER_FAILED = 'user_register_failed';


export const userLogin = data => ({
    type: USER_LOGIN,
    data
})

export const userRegister = data => ({
    type: USER_REGISTER,
    data
})

export const loadUser = () => ({
    type: LOAD_USER,
})


export const listUsers = data => ({
    type: LIST_USERS,
    data
})