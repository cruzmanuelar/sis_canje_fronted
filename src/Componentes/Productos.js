import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import ReactLoading from 'react-loading';
import { Container, Row, Col, Card, Button, Badge, Dropdown} from 'react-bootstrap';
import UserContext from '../context/users/UserContext';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';


const Productos = () => {

    let [productos, setProductos] = useState([]);
    const { updatePuntos, updateUser } = useContext(UserContext);

    useEffect(() => {

        const obtenerProductos = async () => {
        
            const data = await fetch('http://siscanj.herokuapp.com/public/api/productos')
            const productos = await data.json()
            setProductos(productos.data);
        }

        // const puntos = read_cookie('puntos');
        const usuario = read_cookie('usuario');

        console.log(usuario);

        updateUser(usuario);

        obtenerProductos();

    }, []);
    
    

    return (
        <Container className='mt-3'>
            <Row>
                <div className='text-center'>
                    <h3>Productos</h3>                    
                </div>
                <Dropdown.Divider />

                {productos.length === 0 ?
                    <Row
                    style={{
                      position: 'absolute', left: '46%', top: '50%'
                    }}
                    >
                      <ReactLoading type={'bubbles'} color="black" height={'10%'} width={'10%'}></ReactLoading>
                    </Row>
                :
                <Row>
                {productos.map((pr) => 
                    <Col md={3} key={pr.id}>
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
                
                }
                
            </Row>
        </Container>
    )
}

export default Productos;