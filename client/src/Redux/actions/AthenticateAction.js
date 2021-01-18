import { SET_USERNAME, SET_USER_TOKEN } from './type';

export const setUserName = (username) => dispatch => {
    dispatch({
        type: SET_USERNAME,
        userName: username
    })
}

export const setUserToken = (userToken) => dispatch => {
    dispatch({
        type: SET_USER_TOKEN,
        userToken: userToken
    })
}