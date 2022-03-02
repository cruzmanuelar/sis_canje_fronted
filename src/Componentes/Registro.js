import React, { useState } from 'react';
import { Button, Form, Row, Container, Col, Image, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registro } from '../Rutas';


const Registro = () => {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
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

  const ingresoDni = (e) => {

    console.log(e.target.value);
  }

  if(redirect){
    
    navigate('/login');

  }

  return (
    <Container fluid className='p-4 bt-white'>
    <Row>
      <Col sm={0}></Col>
      <Col md={4} className=''>
        <Form onSubmit={enviar} className='border border-secondary rounded p-3 bg-secondary text-white'>
          
          <div className='text-center my-2'>
          <h3>Registro - CoKanje</h3>
            <Image fluid src='/images/botellasplasticas.jpg' className='border rounded' style={{width:'25vh', height:'25vh'}}></Image>
          </div>
          <Dropdown.Divider />
          <Row>
            <Col>
            <Form.Group className="my-2">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" onChange={e => setNombre(e.target.value)} placeholder="Usuario" />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="my-2">
              <Form.Label>DNI</Form.Label>
              <Form.Control type="text" onChange={e => ingresoDni(e)} placeholder="DNI" />
            </Form.Group>
            </Col>
          </Row>
          <Form.Group className="my-2">
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control type="email" onChange={e => setCorreo(e.target.value)} placeholder="Correo electronico" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Contrasena</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
                Registrarse
            </Button>
          </div>
        
        </Form>
      </Col>
      <Col sm={0}></Col>
    </Row>
  </Container>
  )
}

export default Registro