import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import { baseUrl } from '../Rutas';
import moment from 'moment';
import 'moment/locale/es';

const ProductosCanjeados = () => {

    const [ productos, setProductos ] = useState([]);
    const [ cargando, setCargando ] = useState(true);

    useEffect(()=>{

        const obtenerCanjes = async () => {

            const response = await fetch(`${baseUrl}/misCanjes`,{
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

                    {cargando ?
                        <Row style={{height:'100%'}} className='d-flex align-items-center justify-content-center'>
                            <ReactLoading type={'bubbles'} color="black" height={'15%'} width={'15%'}></ReactLoading>
                        </Row>
                    :
                    productos.length === 0?

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
                                <tr className='text-center'>
                                    <td className='h3' colSpan={5}>Aun no has canjeado algun producto</td>
                                </tr>

                            </tbody>
                        </Table>
                                
                    :
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
                                {productos.map((pr, index) => 

                                    <tr key={pr.id} className='text-center justify-content-center'>
                                        <td className='align-middle'>{index + 1}</td>
                                        <td className='align-middle'>{pr.nombre}</td>
                                        <td style={{width:'20%'}}>
                                            <img className='border border-rounded' style={{width:'50%', height:'50%'}} alt={pr.nombre} src={pr.imagen}/>
                                        </td>
                                        <td className='align-middle'>{pr.puntos} puntos</td>
                                        <td className='align-middle'>{moment(pr.created_at).format('Do MMMM YYYY, h:mm a')}</td>
                                    </tr>

                                )}
                            </tbody>
                        </Table>                        
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default ProductosCanjeados;