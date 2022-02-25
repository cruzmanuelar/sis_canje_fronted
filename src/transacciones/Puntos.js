import { useContext } from 'react';
import { read_cookie, bake_cookie } from 'sfcookies';
import UserContext from '../context/users/UserContext';


const ActualizarPuntos = (puntosProducto) => {

    const { updatePuntos } = useContext(UserContext);
    
    const puntosAntes = read_cookie('puntos');
    const puntosAhora = puntosAntes - puntosProducto;
    bake_cookie('puntos', puntosAhora);
    updatePuntos(puntosAhora);
}

export { ActualizarPuntos };