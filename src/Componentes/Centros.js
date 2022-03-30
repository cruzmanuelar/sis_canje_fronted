import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { baseUrl } from '../Rutas';
import '../estilos/estilos.css';

const Centros = () => {
    
    let [centros, setCentros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const obtenerCentros = async () => {
            
            const data = await fetch(`${baseUrl}/centros`)
            const centros = await data.json()
            setCentros(centros.data);
        };
        
        obtenerCentros();

    },[]);

    const verCentro = (id) => {
        navigate(`/centro/${id}`);
        
    }

    return (
        <div className={centros.length === 0? 'fondo':'fondoproductos' }>
        <Container className='text-center pt-3'>
                <Row>
                <div className='text-center'>
                    <h3>Centros</h3>                    
                </div>
                
                <Dropdown.Divider />

                {centros.length === 0 ?
                    <Row style={{height:'100%'}} className='d-flex align-items-center justify-content-center'>
                        <ReactLoading type={'bubbles'} color="black" height={'15%'} width={'15%'}></ReactLoading>
                    </Row>
                :
                <Row>
                    {centros.map((cen) => 
                    
                    <Col md={4} className='' key={cen.id}>
                    <Card className='mt-4'>
                            <Card.Img variant="top" className='' src={cen.imagen}/>
                            <Card.Body>
                                <Card.Title>{cen.nombre}</Card.Title>
                                
                                <Card.Text>
                                    Direccion: {cen.direccion}
                                </Card.Text>
                                <Button onClick={()=> verCentro(cen.id)} variant="success">Ver centro</Button>
                            </Card.Body>
                    </Card>
                    </Col>
                    )}
                </Row>
                }
                </Row>
        </Container>
        </div>
    )
}

export default Centros;