import { 
    DISPLAY_ALERT,
    CLEAR_ALERT,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_BREEDER_SUCCESS,
    LOGIN_USER_ERROR,
    REGISTER_BREEDER_SUCCESS,
    TEST,
} from "./actions";

const reducer = (state, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {...state, showAlert: true, alertType: 'danger', alertText: action.alertText};
        case CLEAR_ALERT:
            return {...state, showAlert: false, alertType: '', alertText: ''};
        case LOGIN_USER_BEGIN:
            return {...state, isLoading: true };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token, 
                user:action.payload.user,
                showAlert: true,
                alertType: 'success',
                alertText: 'User Logged In!'
            };
        case LOGIN_BREEDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token, 
                breeder:action.payload.breeder,
                showAlert: true,
                alertType: 'success',
                alertText: 'User Logged In!'
            };
        case LOGIN_USER_ERROR:
            return {
                ...state, 
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Login Error mate'
            };
        case TEST:
            return {
                ...state,
                test:"Second Value"
            };
        case REGISTER_BREEDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token, 
                breeder:action.payload.breeder,
                showAlert: true,
                alertType: 'success',
                alertText: 'Breeder Registered!'
            };
        default:
            throw new Error(`no such action : ${action.type}`)
    }
}

export default reducer
