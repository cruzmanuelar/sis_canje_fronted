import React, { useState,useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { bake_cookie } from 'sfcookies';
import UserContext from '../context/users/UserContext';
import { login } from "../Rutas";

const Login = () => {

  const { updatePuntos, updateUser } = useContext(UserContext);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  const enviar = async (e) => {

    e.preventDefault();

    const response = await fetch(login,{
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        correo,
        password
      })
    });

    const content = await response.json();

    if(content.message == 'Bienvenido'){

      let nuevaCookie = content.token;
      let usuario = content.user;
      let puntos = content.puntos;
    
      bake_cookie('jwt', nuevaCookie);
      bake_cookie('usuario', usuario);
      bake_cookie('puntos', puntos);
    
      updatePuntos(puntos);
      updateUser(usuario);

      navigate('/');

    }else{

      console.log('Pa fuera pa la calle');
    }

  }

  return (
    <Container>
      <Row className='mt-4'>
        <Col></Col>
        <Col md={4}>
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
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Login;
