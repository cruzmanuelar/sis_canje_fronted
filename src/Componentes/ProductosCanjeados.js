import React, { useEffect, useState, useContext } from 'react';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { Container, Row, Col, Table } from 'react-bootstrap';
import UserContext from '../context/users/UserContext';
import ReactLoading from 'react-loading';

const ProductosCanjeados = () => {

    const [ productos, setProductos ] = useState([]);
    const { user, updateUser, updatePuntos } = useContext(UserContext);

    useEffect(()=>{

        const obtenerCanjes = async () => {

            const response = await fetch('https://siscanj.herokuapp.com/public/api/misCanjes',{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${read_cookie('jwt')}`
                }
            });

            const content = await response.json();
            setProductos(content.productos)

        }

        const usuario = read_cookie('usuario');
        const puntos = read_cookie('puntos');

        updateUser(usuario);
        updatePuntos(puntos);

        obtenerCanjes();
    },[])

    return (
        <Container className='mt-4'>

            <Row className=''>
                <div className='text-center'>
                    <h3>Mis productos canjeados</h3>                    
                </div>

                <Col className='mt-2'>
                    <Table striped bordered hover>
                        <thead className='text-center'>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Imagen</th>
                                <th>Costo</th>
                                <th>Fecha de canje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.length === 0 ?
                                <Row
                                style={{
                                position: 'absolute', left: '46%', top: '50%'
                                }}
                                >
                                <ReactLoading type={'bubbles'} color="black" height={'10%'} width={'10%'}></ReactLoading>
                                </Row>
                            :
                                productos.map((pr, index) => 
                                    <tr key={pr.id} className='text-center justify-content-center'>
                                        <td className='align-middle'>{index + 1}</td>
                                        <td className='align-middle'>{pr.nombre}</td>
                                        <td style={{width:'20%'}}>
                                            <img style={{width:'50%', height:'50%'}} alt={pr.nombre} src={pr.imagen}/>
                                        </td>
                                        <td className='align-middle'> puntos</td>
                                        <td className='align-middle'>Imagen</td>
                                    </tr>
                                )   
                            }

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductosCanjeados