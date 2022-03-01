import React, { useReducer } from "react";
import UserReducer from './UserReducer';
import UserContext from "./UserContext";

import { UPDATE_PUNTOS, UPDATE_USER, UPDATE_AUTH} from "../types";

const UserState = (props) => {

    const initialState = {
        user:'',
        puntos: null,
        auth:false
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)
    
    const updatePuntos = (puntos) => {
        

        dispatch({
            type:UPDATE_PUNTOS,
            payload:puntos
        })
    }

    const updateUser = (user) => {
        
        dispatch({
            type:UPDATE_USER,
            payload:user
        })
    }
    const updateAuth = (status) => {
        
        dispatch({
            type:UPDATE_AUTH,
            payload:status
        })
    }

    return (
        <UserContext.Provider value={{
            user:state.user, 
            puntos:state.puntos,
            auth:state.auth,
            updatePuntos,
            updateUser,
            updateAuth
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;