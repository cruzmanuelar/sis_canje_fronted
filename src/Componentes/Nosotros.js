import React, { useEffect } from 'react';
import { Container, Row, Col, Image, Card, Badge, Button, Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import estilos from '../estilos/estilos.css';

const Nosotros = () => {


    useEffect(()=>{

    },[])

  return (
    <div className='fondoproductos'>
    <Container>
      <Row className='pt-3'>
        <Col md={6} sm={12}>
          <h3>¿Qué es CoKanje?</h3>
          <p>CoKanje es una plataforma virtual(ficticia) que te permite canjear bebidas gaseosos a cambio de puntos provenientes de productos ya consumidos, esta plataforma nació con la idea de poder contribuir al medio ambiente.</p>
          <Image fluid className='rounded' style={{border:'2px solid black'}} src='images/referenciaCanje.png'></Image>
          <Row>
            <Col>
            <h4 className='mt-2'>¿Cómo conseguir puntos?</h4>
            <p>Ingresa el código CoKanje que tiene cada botella en su etiqueta. Una vez dentro de tu cuenta CoKanje:</p>
            <p><b>1.</b> Seleccionar pestana "Perfil"<br/>
            <b>2.</b> Hacer click en "Canjear puntos"<br/>
            <b>3.</b> Ingresar código y canjear
            </p>
            </Col>
            <Col className='d-flex align-items-center'>
              <Image className='' fluid src='images/codigoCoKanje.png'>

              </Image>
            </Col>
          </Row>
        </Col>
        <Col md={6} sm={12}>
          <h3>¿Cómo canjear productos?</h3>
          <p><b>1. </b>Ingresa a la web de CoKanje o dirigete a uno de los <Link to="/centros">centros</Link> autorizados.</p>
          <p><b>2. </b>Cada producto tiene un precio basado en puntos</p>
          <p><b>3. </b>Puedes ver los productos disponibles en la sección "Productos" o accediendo a cada centro en particular</p>
          <p><b>4. </b>Pulsa en "Canjear producto"</p>
          <Row className='text-center'>
            <Col md={6} sm={12}>
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
            <Col md={6} sm={12}>
              <h5>Una vez canjeado tu producto:</h5>
              <p><b>- </b>Si canjeaste desde tu casa, acércate al centro autorizado mas cercano con tu DNI para recoger tu producto</p>
              <p><b>- </b>Si canjeaste el centro autorizado, entrega tu DNI al encargado de caja para que te pueda entregar tu producto</p>
              <Dropdown.Divider />
              <h5>¿Dónde puedo ver mis productos canjeados?</h5>
              <p><b>1.</b> Seleccionar pestana "Perfil"<br/>
              <b>2.</b> Hacer click en "Productos canjeados"<br/></p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Nosotros;