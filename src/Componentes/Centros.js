import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Centros = () => {

    let [centros, setCentros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        obtenerCentros();

    }, []);
    
    const obtenerCentros = async () => {
        
        const data = await fetch('http://siscanj.herokuapp.com/public/api/centros')
        const centros = await data.json()
        setCentros(centros.data);
    };

    const verCentro = (id) => {
        console.log(id);
        navigate(`/centro/${id}`);
    }

    return (
        <Container className='text-center mt-3'>
                <Row>
                <div className='text-center'>
                    <h3>Centros</h3>                    
                </div>
                
                <Dropdown.Divider />
                {centros.map((cen) => 
                
                
                    <Col md={4} className=''>
                    <Card className='mt-4'>
                            <Card.Img variant="top" src={cen.imagen}/>
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
        </Container>
    )
}

export default Centros;