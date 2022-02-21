//Definicion del estado
//Estado que vamos a consumir y funciones del estado
import React, { useReducer } from "react";
import UserReducer from './UserReducer';
import UserContext from "./UserContext";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

import { UPDATE_PUNTOS, UPDATE_USER} from "../types";

const UserState = (props) => {

    const initialState = {
        user:'',
        puntos: null
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)
    
    const updatePuntos = (puntos) => {
        
        // const misPuntos = read_cookie('puntos');

        dispatch({
            type:'UPDATE_PUNTOS',
            payload:puntos
        })
    }

    const updateUser = (user) => {
        
        dispatch({
            type:'UPDATE_USER',
            payload:user
        })
    }

    return (
        <UserContext.Provider value={{
            user:state.user, 
            puntos:state.puntos,
            updatePuntos,
            updateUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;