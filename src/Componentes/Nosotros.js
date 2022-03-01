import React, { useEffect } from 'react';
import { Container, Row, Col, Image, Card, Badge, Button, Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Nosotros = () => {


    useEffect(()=>{

    },[])

  return (
    <Container>
      <Row className='mt-3'>
        <Col md={6} sm={12}>
          <h3>Que es CoKanje?</h3>
          <p>CoKanje es una plataforma virtual(ficticia) que te permite canjear bebidas gaseosos a cambio de puntos provenientes de productos ya consumidos, esta plataforma nacio con la idea de poder contribuir al medio ambiente.</p>
          <Image fluid className='rounded border border-dark' src='images/referenciaCanje.png'></Image>
          <Row>
            <Col>
            <h4 className='mt-2'>Como conseguir puntos?</h4>
            <p>Ingresa el codigo CoKanje que tiene cada botella en su etiqueta. Una vez dentro de tu cuenta CoKanje:</p>
            <p><b>1.</b> Seleccionar pestana "Perfil"<br/>
            <b>2.</b> Hacer click en "Canjear puntos"<br/>
            <b>3.</b> Ingresar codigo y canjear
            </p>
            </Col>
            <Col className='d-flex align-items-center'>
              <Image className='' fluid src='images/codigoCoKanje.png'>

              </Image>
            </Col>
          </Row>
        </Col>
        <Col md={6} sm={12}>
          <h3>Como canjear productos?</h3>
          <p><b>1. </b>Ingresa a la web de CoKanje o dirigete a uno de los <Link to="/centros">centros</Link> autorizados.</p>
          <p><b>2. </b>Cada producto tiene un precio basado en puntos</p>
          <p><b>3. </b>Puedes ver los productos disponibles en la seccion "Productos" o accediendo a cada centro en particular</p>
          <p><b>4. </b>Pulsa en canjear producto</p>
          <Row>
            <Col>
            <Card style={{ width: '15rem' }} className='mt-3'>
              <Card.Img variant="top" src='/images/gaseosaEjemplo.jpg'/>
              <Card.Body>
                <Card.Title>Gaseosa</Card.Title> 
                <Card.Text className='h5'>
                  <Badge bg="danger">Precio en ptos</Badge>
                </Card.Text>
                <Button variant="primary">Canjear producto</Button>
              </Card.Body>
            </Card>
            </Col>
            <Col>
              <h5>Una vez canjeado tu producto:</h5>
              <p><b>- </b>Si canjeaste desde tu casa, acercate al centro autorizado mas cercano con tu DNI para recoger tu producto</p>
              <p><b>- </b>Si canjeaste el centro autorizado, entrega tu DNI al encargado de caja para que te pueda entregar tu producto</p>
              <Dropdown.Divider />
              <h5>Donde puedo ver mis productos canjeados?</h5>
              <p><b>1.</b> Seleccionar pestana "Perfil"<br/>
              <b>2.</b> Hacer click en "Productos canjeados"<br/></p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Nosotros