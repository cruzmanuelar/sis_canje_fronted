import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import ReactLoading from 'react-loading';
import { Container, Row, Col, Card, Button, Badge, Dropdown } from 'react-bootstrap';
import UserContext from '../context/users/UserContext';
import { read_cookie, bake_cookie } from 'sfcookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Productos = () => {

    let [productos, setProductos] = useState([]);
    const { user, updatePuntos, updateUser } = useContext(UserContext);

    const alertaNoLogeado = () => toast.error("Debes iniciar sesion!",{
        theme: "dark"
    });

    const puntosInsuficientes = () => toast.warning("No cuentas con suficientes puntos!",{
        theme: "dark"
    });

    useEffect(() => {

        const obtenerProductos = async () => {
        
            const data = await fetch('http://siscanj.herokuapp.com/public/api/productos')
            const productos = await data.json()
            setProductos(productos.data);
        }

        const usuario = read_cookie('usuario');
        const puntos = read_cookie('puntos');

        updateUser(usuario);
        updatePuntos(puntos);

        obtenerProductos();

    }, []);

    const canjearProducto = async (id, puntosProducto) =>{

        const response = await fetch('https://siscanj.herokuapp.com/public/api/canjepuntos',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${read_cookie('jwt')}`
            },
            body: JSON.stringify({
                id_producto:id,
            })
        });

        const content = await response.json();

        if(content.message == 'No cuentas con suficientes puntos'){
            puntosInsuficientes();
        }else{
            console.log('tienes puntos ps');
            const puntosAntes = read_cookie('puntos');
            const puntosAhora = puntosAntes - puntosProducto;
            bake_cookie('puntos', puntosAhora);
            updatePuntos(puntosAhora);

        }
    }

    const validarPuntos = (id, puntosProducto) => {

        if(user == ''){
            alertaNoLogeado();
        }else{

            canjearProducto(id, puntosProducto);
        }
    }
    
    return (
        <Container className='mt-3'>
            <Row>
                <div>
                    <ToastContainer position='bottom-right' hideProgressBar={true} />
                </div>
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
                                <Button onClick={() => validarPuntos(pr.id, pr.precio_puntos)} variant="primary">Canjear producto</Button>
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