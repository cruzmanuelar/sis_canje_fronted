import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import UserContext from '../context/users/UserContext';
import { read_cookie } from 'sfcookies';
import { getCentros } from '../Rutas';

const Centros = () => {

    const { updatePuntos } = useContext(UserContext);
    
    let [centros, setCentros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const obtenerCentros = async () => {
            
            const data = await fetch(getCentros)
            const centros = await data.json()
            setCentros(centros.data);
        };
        
        obtenerCentros();

    },[]);

    const verCentro = (id) => {
        navigate(`/centro/${id}`);
    }

    return (
        <Container className='text-center mt-3'>
                <Row>
                <div className='text-center'>
                    <h3>Centros</h3>                    
                </div>
                
                <Dropdown.Divider />

                {centros.length === 0 ?
                    <Row
                    style={{
                      position: 'absolute', left: '46%', top: '50%'
                    }}
                    >
                      <ReactLoading type={'bubbles'} color="black" height={'10%'} width={'10%'}></ReactLoading>
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
    )
}

export default Centros;