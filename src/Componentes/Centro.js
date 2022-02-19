import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Dropdown} from 'react-bootstrap';
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
    <Container fluid className='mt-3'>
      {centro.length === 0 ?
        <Row
        style={{
          position: 'absolute', left: '45%', top: '50%'
        }}
        >
          <ReactLoading type={'bubbles'} color="black" height={'20%'} width={'20%'}></ReactLoading>
        </Row>
        :
        <Row>
          <Col md={3} className='text-center mx-auto'>
            <div className='text-center mt-2'>
              <h3>Centro</h3>                    
            </div>
            <Card className='mt-4'>
              <Card.Body>
                <Card.Title>{centro.nombre}</Card.Title>
                <Card.Text>
                  Direccion: {centro.direccion}
                </Card.Text>
                <Card.Img variant="top" src={centro.imagen}/>
                <Button className='mt-2' onClick={irCentros} variant="success">Volver</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          </Col>
          <Col md={8}>
          <div className='text-center'>
            <h3>Productos de este centro</h3>                    
          </div>
          <Dropdown.Divider />
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
                      <Badge bg="warning">{pr.cantidad} disp</Badge>
                    </h5>
                    </Card.Text>
                    <Button variant="primary">Canjear</Button>
                  </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      }
      
    </Container>
  )
}

export default Centro