import React, { useEffect, useContext, useState } from 'react';
import ReactLoading from 'react-loading';
import { Container, Row, Col, Card, Button, Badge, Dropdown } from 'react-bootstrap';
import UserContext from '../context/users/UserContext';
import { ToastContainer } from 'react-toastify';
import { puntosInsuficientes, alertaNoLogeado, canjeExitoso } from './alertas/alertasToastify';
import { getProductos, canjeProducto } from '../Rutas';

const Productos = () => {

    let [productos, setProductos] = useState([]);
    const { updatePuntos, puntos } = useContext(UserContext);

    useEffect(() => {

        const obtenerProductos = async () => {
        
            const data = await fetch(getProductos)
            const productos = await data.json()
            setProductos(productos.data);
        }

        obtenerProductos();

    }, []);

    const canjearProducto = async (id, puntosProducto) =>{

        if(puntos < puntosProducto){
            return puntosInsuficientes();
        }

        const response = await fetch(canjeProducto,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id_producto:id,
            })
        });

        const content = await response.json();

        if(content.Message === 'No cuentas con suficientes puntos'){

            puntosInsuficientes();

        }else{

            const puntosNuevos = content.puntos;
            localStorage.setItem('puntos', puntosNuevos);
            updatePuntos(puntosNuevos);
            canjeExitoso(content.Message);
        }
    }

    const validarUsuario = (id, puntosProducto) => {

        const token = localStorage.getItem('token');

        token === null ? alertaNoLogeado() : canjearProducto(id, puntosProducto);
    }
    
    return (
        <Container className='mt-3'>
            <div>
                <ToastContainer position='bottom-right' hideProgressBar={true} />
            </div>
            <Row>
            <div className='text-center'>
                <h3>Productos</h3>                    
            </div>
            <Dropdown.Divider />

                {productos.length === 0 ?
                    <Row style={{height:'100%'}} className='d-flex align-items-center justify-content-center'>
                        <ReactLoading type={'bubbles'} color="black" height={'15%'} width={'15%'}></ReactLoading>
                    </Row>
                :
                <Row>
                {productos.map((pr) => 
                    <Col md={3} key={pr.id}>
                    <Card className='mt-4'>
                    <Card.Img variant="top" src={pr.imagen}/>
                    <Card.Body>
                      <Card.Title>{pr.nombre}</Card.Title>
                      <Card.Text className='h5'>
                        <Badge bg="danger">{pr.precio_puntos} ptos</Badge>
                      </Card.Text>
                      <Button onClick={() => validarUsuario(pr.id, pr.precio_puntos)} variant="primary">Canjear producto</Button>
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