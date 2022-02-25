import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { registro } from '../Rutas';


const Registro = () => {

  const [nombre, setNombre] = useState('');
  const [correo, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  let navigate = useNavigate();

  const enviar = async (e) => {

    e.preventDefault();

    const response = await fetch(registro,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        nombre,
        correo,
        dni,
        password
      })
    });

    setRedirect(true);
  
  }

  if(redirect){
    
    navigate('/login');

  }

  return (
    <div>
      <Form onSubmit={enviar}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control type="text" onChange={ e => setNombre(e.target.value)} placeholder="Usuario" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control type="email" onChange={ e => setEmail(e.target.value)} placeholder="Correo electronico" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>DNI</Form.Label>
          <Form.Control type="text" onChange={ e => setDni(e.target.value)} placeholder="8 Digitos" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contrasena</Form.Label>
          <Form.Control type="password" onChange={ e => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
            Registrarse
        </Button>
        
      </Form>
    </div>
  )
}

export default Registro