import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';


const Login = () => {

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  let navigate = useNavigate();

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

    bake_cookie('jwt', nuevaCookie);

    setRedirect(true);
  
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
