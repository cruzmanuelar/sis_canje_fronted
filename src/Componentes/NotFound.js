import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
// import img404 from '.../public/images/img404.jpg';

const NotFound = () => {
  return (
    <Container>
      <Row className="justify-content-md-center text-center">
        <Col xs={12} sm={4} md={12}>
          <h3 className='mt-3' >Pagina no encontrada</h3>
          <Image fluid style={{height:'80vh', width:'80vh'}} src='images/img404.jpg'></Image>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound