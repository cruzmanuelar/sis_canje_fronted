import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button} from 'react-bootstrap';

const Centros = () => {

    let [centros, setCentros] = useState([]);

    useEffect(() => {

        obtenerCentros();

    }, []);
    
    const obtenerCentros = async () => {
        
        const data = await fetch('http://siscanj.herokuapp.com/public/api/centros')
        const centros = await data.json()
        setCentros(centros.data);
    }

    return (
        <Container fluid className='text-center'>

                <div className='text-center'>
                    <h3>Centros</h3>                    
                </div>
                {centros.map((cen) => 
                
                <Row>
                    <Col></Col>
                    <Col sm={10} className=''>
                    <Card className='mt-4'>
                            <Card.Img variant="top" src={cen.imagen}/>
                            <Card.Body>
                                <Card.Title>{cen.nombre}</Card.Title>
                                
                                <Card.Text>
                                    Direccion: {cen.direccion}
                                </Card.Text>
                                <Button variant="success">Ver centro</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
                
                )}
        </Container>
    )
}

export default Centros;