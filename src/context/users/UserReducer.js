import { UPDATE_PUNTOS, UPDATE_USER, UPDATE_AUTH } from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    const {payload, type} = action;

    switch(type){

        case UPDATE_PUNTOS:
            return {
                ...state,
                puntos:payload
            }
        case UPDATE_AUTH:
            return {
                ...state,
                auth:payload
                }
        case UPDATE_USER:
            return{
                ...state,
                user:payload
            }
        default:
            return state;
    }
}