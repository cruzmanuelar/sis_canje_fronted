import React, { useContext, useEffect } from 'react';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import UserContext from '../context/users/UserContext';


const Nosotros = () => {

    const { updatePuntos, updateUser } = useContext(UserContext);

    useEffect(()=>{

      const usuario = read_cookie('usuario');
      console.log(usuario);
      updateUser(usuario);

    },[])

  return (
    <div>Nosotros</div>
  )
}

export default Nosotros