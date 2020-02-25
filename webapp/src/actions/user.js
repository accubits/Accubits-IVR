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
