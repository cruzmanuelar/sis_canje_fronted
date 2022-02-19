import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge} from 'react-bootstrap';
import ReactLoading from 'react-loading';

const Centro = () => {

  let [centro, setCentro] = useState([]);
  let [producto, setProductos] = useState([]);

  const {id} = useParams();
  const navigate = useNavigate();

  let url = `http://siscanj.herokuapp.com/public/api/centro-${id}`;

  useEffect(() => {

    console.log('los datos');

    const obtenerCentros = async () => {

      const data = await fetch(url)
      const centros = await data.json()
      setCentro(centros.centro);
      setProductos(centros.productos);
    };

    obtenerCentros();

  }, [url]);

  const irCentros = () => {
    navigate('/centros');
  }


  return (
    <Container fluid>
      <Row>
        {centro.length === 0 ? <p>No hay cositas</p> : <p>Ya cargo</p>}
        <Col md={3} className='text-center mx-auto'>
          <Card className='mt-4'>
            <Card.Img variant="top" src={centro.imagen}/>
            <Card.Body>
              <Card.Title>{centro.nombre}</Card.Title>
              <Card.Text>
                Direccion: {centro.direccion}
              </Card.Text>
              <Button onClick={irCentros} variant="success">Volver</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
        </Col>
        <Col md={8}>
          <Row className=''>
            {producto.map((pr) => 
              <Col md={3}>
                <Card className='mt-4'>
                <Card.Img variant="top" src={pr.imagen}/>
                <Card.Body>
                  <Card.Title>{pr.nombre}</Card.Title>
                  <Card.Text>
                  <h5>
                    <Badge bg="danger">{pr.precio_puntos} ptos</Badge>{' '}
                    <Badge bg="primary">{pr.cantidad} disp</Badge>
                  </h5>
                  </Card.Text>
                  <Button variant="success">Canjear</Button>
                </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Centro