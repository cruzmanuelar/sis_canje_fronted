import React, { useContext, useEffect, useState } from 'react';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { Button,} from 'react-bootstrap';
import UserContext from '../context/users/UserContext';


const Nosotros = () => {

    const { updatePuntos, updateUser } = useContext(UserContext);

    useEffect(()=>{

      const usuario = read_cookie('usuario');
      const puntos = read_cookie('puntos');
      console.log(usuario);
      updateUser(usuario);
      updatePuntos(puntos);

    },[])

  return (
    <div>
      <Button>
        Canjear puntos
      </Button>
    </div>
  )
}

export default Nosotros