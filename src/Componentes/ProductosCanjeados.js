import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import { getCanjes } from '../Rutas';

const ProductosCanjeados = () => {

    const [ productos, setProductos ] = useState([]);
    const [ cargando, setCargando ] = useState(true);

    useEffect(()=>{

        const obtenerCanjes = async () => {

            const response = await fetch(getCanjes,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            });

            const content = await response.json();
            setProductos(content.productos);
            setCargando(false);

        }

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
                            {cargando ?
                                <Row
                                style={{
                                position: 'absolute', left: '46%', top: '50%'
                                }}
                                >
                                <ReactLoading type={'bubbles'} color="black" height={'10%'} width={'10%'}></ReactLoading>
                                </Row>
                            :
                                productos.length === 0?
                                
                                <tr className='text-center'>
                                    <td className='h3' colSpan={5}>Aun no has canjeado algun producto</td>
                                </tr>
                                
                                :
                                productos.map((pr, index) => 
                                    <tr key={pr.id} className='text-center justify-content-center'>
                                        <td className='align-middle'>{index + 1}</td>
                                        <td className='align-middle'>{pr.nombre}</td>
                                        <td style={{width:'20%'}}>
                                            <img className='border border-rounded' style={{width:'50%', height:'50%'}} alt={pr.nombre} src={pr.imagen}/>
                                        </td>
                                        <td className='align-middle'>{pr.puntos} puntos</td>
                                        <td className='align-middle'>{pr.created_at}</td>
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

export default ProductosCanjeados;