import React, { useReducer, useContext, useEffect } from 'react'
import reducer from './reducer'
import axios from 'axios';

import { 
    DISPLAY_ALERT,
    CLEAR_ALERT,
    // REGISTER_USER_BEGIN,
    // REGISTER_USER_SUCCESS,
    // REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_BREEDER_SUCCESS,
    LOGIN_USER_ERROR,
    UPDATE_PROJECT,
    UPDATE_PROJECT_IN_STATE,
    TEST,
    REGISTER_BREEDER_SUCCESS
} from "./actions";


const user = localStorage.getItem('user');
const breeder = localStorage.getItem('breeder');
const token = localStorage.getItem('token');

const apiLink = "https://vifta-mvp-9818ad49d787.herokuapp.com"
const local = "http://localhost:5000"
const api = local

const initialAppContextState = {
   
    user: user ? JSON.parse(user) : null,
    breeder: breeder ? JSON.parse(breeder) : null,
    token: token,
    api: local
   
}

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialAppContextState);

    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = () => {
        // setTimeout( () => {
        //     dispatch({type: CLEAR_ALERT})
        // }, 3000)
    }

    //will be updated to run on login
    const addUserToLocalStorage = ({user, token}) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const removeBreederFromLocalStorage = () => {
        localStorage.removeItem('breeder')
        localStorage.removeItem('token')
    }


    const addBreederToLocalStorage = ({breeder, token}) => {
        localStorage.setItem('breeder', JSON.stringify(breeder));
        localStorage.setItem('token', token);
    }


    const loginUser = async (currentUser) => {
        dispatch({type: LOGIN_USER_BEGIN});
        console.log(currentUser)

        try {
                await axios.post(api+'/controller/auth/login', currentUser).then( (response) => {

                if(response.status != 200){
                    console.log("nope")

                    return ;
                }

                const {user, token} = response.data;
                
                dispatch({type: LOGIN_USER_SUCCESS, payload:{user, token}})
            
                addUserToLocalStorage({user, token});
    
                clearAlert();

            });
            
            
        } catch (error){
            console.log("ERRORRR")

            console.log(error);

            // dispatch({type: LOGIN_USER_ERROR, payload: {msg:error.response.data.msg}});

            // clearAlert();
        }

    }

    const logoutUser = () => {
        removeUserFromLocalStorage()
    }
    
    const logoutBreeder = () => {
        removeBreederFromLocalStorage()
    }

    const breederRegistered = (breeder, token) => {
        dispatch({type: REGISTER_BREEDER_SUCCESS, payload:{breeder, token}})
        addBreederToLocalStorage({breeder, token});
    }

    const loginBreeder = async (currentBreeder) => {
        dispatch({type: LOGIN_USER_BEGIN});
        console.log(LOGIN_USER_BEGIN)

        try {
                await axios.post(api+'/controller/auth/loginBreeder', currentBreeder).then( (response) => {

                if(response.status != 200){
                    console.log("nope")

                    return ;
                }
                const {breeder, token} = response.data;
                console.log(breeder)
                console.log(token)
                
                dispatch({type: LOGIN_BREEDER_SUCCESS, payload:{breeder, token}})
                

                addBreederToLocalStorage({breeder, token});
                
                clearAlert();

            });
            
            
        } catch (error){

            console.log(error);

            // dispatch({type: LOGIN_USER_ERROR, payload: {msg:error.response.data.msg}});

            // clearAlert();
        }

    }

    return (
        <AppContext.Provider value = {{...state, displayAlert, loginUser, loginBreeder, logoutUser, logoutBreeder, breederRegistered}}>{children}</AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialAppContextState, useAppContext }