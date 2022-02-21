import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import useUser from '../hooks/useUser';

const Login = () => {

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  // const user = useUser();

  let navigate = useNavigate();

  // const {value, setValue} = useContext(UserContext);

  const enviar = async (e) => {

    e.preventDefault();

    const response = await fetch('https://siscanj.herokuapp.com/public/api/login',{
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        correo,
        password
      })
    });

    const content = await response.json();

    let nuevaCookie = content.token;
    let usuario = content.user;
    let puntos = content.puntos;

    bake_cookie('jwt', nuevaCookie);
    bake_cookie('usuario', usuario);
    bake_cookie('puntos', puntos);

    let datosUsario = {
      token:nuevaCookie,
      usuario:usuario,
      puntos:puntos
    }

    // setValue(datosUsario);
    // console.log(value);
    // setRedirect(true);

  }

  if(redirect){
    navigate('/');
  }

  return (
    <div>
      <Form onSubmit={enviar}>
        <Form.Group className="mb-3">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control type="email" onChange={e => setCorreo(e.target.value)} placeholder="Correo electronico" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contrasena</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
            Ingresar
        </Button>
        
      </Form>
    </div>
  );
};

export default Login;
