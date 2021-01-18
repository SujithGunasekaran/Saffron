import { SET_USERNAME, SET_USER_TOKEN } from '../actions/type';

const initialState = {
    username: '',
    usertoken: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.userName
            }
        case SET_USER_TOKEN:
            return {
                ...state,
                usertoken: action.userToken
            }
        default:
            return state
    }
}