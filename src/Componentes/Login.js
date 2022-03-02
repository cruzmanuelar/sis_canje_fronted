import React, { useState,useContext } from "react";
import { Container, Row, Col, Button, Form, Dropdown, Image } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/users/UserContext';
import { login } from "../Rutas";

const Login = () => {

  const { updatePuntos, updateAuth } = useContext(UserContext);
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

    if(content.message === 'Bienvenido'){

      let token = content.token;
      let puntos = content.puntos;

      localStorage.setItem('token', token);
      localStorage.setItem('puntos', puntos);
      updateAuth(true);
      updatePuntos(puntos);

      navigate('/');

    }else{
      console.log('Unauthorized');
    }

  }

  return (
    <Container fluid className='p-4 bt-white'>
      <Row>
        <Col sm={0}></Col>
        <Col md={4} className=''>
          <Form onSubmit={enviar} className='border border-secondary rounded p-3 bg-secondary text-white'>
            
            <div className='text-center my-3'>
            <h3>Iniciar sesion - CoKanje</h3>
              <Image fluid src='/images/botellasplasticas.jpg' className='border rounded' style={{width:'25vh', height:'25vh'}}></Image>
            </div>
            <Dropdown.Divider />
            <Form.Group className="my-3">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control type="email" onChange={e => setCorreo(e.target.value)} placeholder="Correo electronico" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contrasena</Form.Label>
              <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="success" type="submit">
                  Iniciar sesion
              </Button>
            </div>
          
          </Form>
        </Col>
        <Col sm={0}></Col>
      </Row>
    </Container>
  );
};

export default Login;
