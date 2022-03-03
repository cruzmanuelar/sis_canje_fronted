import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Dropdown} from 'react-bootstrap';
import ReactLoading from 'react-loading';
import UserContext from '../context/users/UserContext';
import { ToastContainer } from 'react-toastify';
import { puntosInsuficientes, alertaNoLogeado, canjeExitoso } from './alertas/alertasToastify';
import { canjeProducto, centroId } from '../Rutas';
import login from '../estilos/login.css';

const Centro = () => {

  const { puntos, updatePuntos } = useContext(UserContext);

  let [centro, setCentro] = useState([]);
  let [producto, setProductos] = useState([]);

  const {id} = useParams();
  const navigate = useNavigate();

  let url = `${centroId}-${id}`;

  useEffect(() => {

    const obtenerCentros = async () => {

      const data = await fetch(url)
      const centros = await data.json()
      setCentro(centros.centro);
      setProductos(centros.productos);
    };
    
    obtenerCentros();

  }, []);

  const irCentros = () => {
    navigate('/centros');
  }

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
    <div className={centro.length === 0? 'fondo':'fondoproductos' }>
    <Container className='pt-3'>
      <div>
        <ToastContainer position='bottom-right' hideProgressBar={true} />
      </div>
      <Row>
        <Col md={3}>
          <div className='text-center mt-2'>
              <h3>Centro</h3>                    
            </div>
        </Col>
        <Col md={8}>
          <div className='text-center mt-3'>
            <h3>Productos de este centro</h3>                    
          </div>
        </Col>
      </Row>
      {centro.length === 0 ?
        <Row style={{height:'100%'}} className='d-flex align-items-center justify-content-center'>
          <ReactLoading type={'bubbles'} color="black" height={'15%'} width={'15%'}></ReactLoading>
        </Row>
        :
        <Row>
          <Col md={3} className='text-center mx-auto'>
            <Card className='mt-4'>
              <Card.Body>
                <Card.Title>{centro.nombre}</Card.Title>
                <Card.Text>
                  Direccion: {centro.direccion}
                </Card.Text>
                <Card.Img variant="top" src={centro.imagen}/>
                <Button className='mt-2' onClick={irCentros} variant="success">Volver</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          </Col>
          <Col md={8}>
          
          <Dropdown.Divider />
            <Row className=''>
              {producto.map((pr) => 
                <Col md={3} key={pr.id}>
                  <Card className='mt-4'>
                  <Card.Img variant="top" src={pr.imagen}/>
                  <Card.Body>
                    <Card.Title>{pr.nombre}</Card.Title>
                    <Card.Text className='h5'>
                      <Badge bg="danger">{pr.precio_puntos} ptos</Badge>{' '}
                      <Badge bg="warning">{pr.cantidad} disp</Badge>
                    </Card.Text>
                    <Button onClick={() => validarUsuario(pr.id, pr.precio_puntos)} variant="primary">Canjear producto</Button>
                  </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      }
    </Container>
    </div>
  )
}

export default Centro;