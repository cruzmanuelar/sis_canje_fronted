import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Dropdown} from 'react-bootstrap';
import { useState } from 'react';

const Productos = () => {

    let [productos, setProductos] = useState([]);

    useEffect(() => {

        console.log('los datos');
        obtenerProductos();

    }, []);
    
    const obtenerProductos = async () => {
        
        const data = await fetch('http://siscanj.herokuapp.com/public/api/productos')
        const productos = await data.json()
        setProductos(productos.data);
    }

    return (
        <Container className='mt-3'>
            <Row>
                <div className='text-center'>
                    <h3>Productos</h3>                    
                </div>
                <Dropdown.Divider />
                {productos.map((pr) => 
                    <Col md={3}>
                        <Card style={{ width: '15rem' }} className='mt-4'>
                            <Card.Img variant="top" src={pr.imagen}/>
                            <Card.Body>
                                <Card.Title>{pr.nombre}</Card.Title>
                                
                                <Card.Text>
                                <h5>
                                <Badge bg="danger">{pr.precio_puntos} ptos</Badge>
                                </h5>
                                </Card.Text>
                                <Button variant="primary">Canjear producto</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default Productos;